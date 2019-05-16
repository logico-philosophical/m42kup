function generateParseTreeFromInput(text) {
	var state = {
		levels: [],
		stack: []
	};
	
	function push(fragment) {
		// normalize text
		if (fragment.type == 'text'
				&& state.stack.length
				&& state.stack[state.stack.length - 1].type == 'text') {
			var prepend = state.stack.pop();
			fragment = {
				type: 'text',
				start: prepend.start,
				end: fragment.end,
				data: prepend.data + fragment.data
			};
		}

		if (fragment.type == 'right boundary marker') {
			var buf = [fragment], tmp;
			while (true) {
				tmp = state.stack.pop();
				if (!tmp) throw new Error('No lbm found');
				buf.unshift(tmp);
				if (tmp.type == 'left boundary marker' && tmp.level == fragment.level) break;
			}
			
			var elementStart = buf[0].start,
				elementEnd = buf[buf.length - 1].end;

			fragment = {
				type: 'element',
				start: elementStart,
				end: elementEnd,
				data: text.substring(elementStart, elementEnd),
				children: buf
			};
		}
		
		if (fragment.type == 'right verbatim marker') {
			var buf = [fragment], tmp;
			while (true) {
				tmp = state.stack.pop();
				if (!tmp) throw new Error('No lvm found');
				buf.unshift(tmp);
				if (tmp.type == 'left verbatim marker' && tmp.level == fragment.level) break;
			}
			
			var verbatimStart = buf[0].start,
				verbatimEnd = buf[buf.length - 1].end;

			fragment = {
				type: 'verbatim',
				start: verbatimStart,
				end: verbatimEnd,
				data: text.substring(verbatimStart, verbatimEnd),
				children: buf
			};
		}

		state.stack.push(fragment);
	}
	
	// main loop
	for (var cur = 0; cur < text.length;) {
		if (text[cur] == '`') {
			var lvmStart = cur;
			for (cur++; cur < text.length; cur++) {
				if (text[cur] != '`') break;
			}
			var lvmEnd = cur;

			push({
				type: 'left verbatim marker',
				start: lvmStart,
				end: lvmEnd,
				data: text.substring(lvmStart, lvmEnd),
				level: lvmEnd - lvmStart
			});

			state.levels.push(-(lvmEnd - lvmStart));
			
			var rvmFound = false, rvmStart, rvmEnd;
			for (cur++; cur < text.length; cur++) {
				if (text[cur] == '`') {
					var _rvmStart = cur;
					for (cur++; cur < text.length; cur++) {
						if (text[cur] != '`') break;
					}
					var _rvmEnd = cur;

					if (_rvmEnd - _rvmStart == lvmEnd - lvmStart) {
						rvmFound = true;
						[rvmStart, rvmEnd] = [_rvmStart, _rvmEnd];
						break;
					}
				}
			}

			var textStart = lvmEnd,
				textEnd = rvmFound ? rvmStart : cur;

			push({
				type: 'text',
				start: textStart,
				end: textEnd,
				data: text.substring(textStart, textEnd)
			});

			if (rvmFound) {
				push({
					type: 'right verbatim marker',
					start: rvmStart,
					end: rvmEnd,
					data: text.substring(rvmStart, rvmEnd),
					level: rvmEnd - rvmStart
				});

				state.levels.pop();
			}
		} else if (text[cur] == '[') {
			var lbmStart = cur;
			for (cur++; cur < text.length; cur++) {
				if (text[cur] != '[') break;
			}
			var lbmEnd = cur;

			var currentLevel = state.levels[state.levels.length - 1] || 0;
			if (lbmEnd - lbmStart < currentLevel) {
				push({
					type: 'text',
					start: lbmStart,
					end: lbmEnd,
					data: text.substring(lbmStart, lbmEnd)
				});
				continue;
			}
			
			state.levels.push(lbmEnd - lbmStart);
			push({
				type: 'left boundary marker',
				start: lbmStart,
				end: lbmEnd,
				data: text.substring(lbmStart, lbmEnd),
				level: lbmEnd - lbmStart
			});
			
			// excludes: '(', ':', '[', ']', '|'
			// this regex always matches something
			var tagNameRegex = /^(?:(?:\*{1,3}|={1,6}|\${1,2}|;{1,3}|[!"#$%&')*+,\-.\/;<=>?@\\^_`{}~]|[a-z][a-z0-9]*)|)/i,
				tagNameStart = cur,
				tagNameEnd = tagNameStart + text.substring(tagNameStart)
						.match(tagNameRegex)[0].length;
			
			push({
				type: 'tag name',
				start: tagNameStart,
				end: tagNameEnd,
				data: text.substring(tagNameStart, tagNameEnd)
			});

			cur = tagNameEnd;

			var separatorRegex = /^(?:[ \t|]|)/i,
				separatorStart = cur,
				separatorEnd = separatorStart
					+ text.substring(separatorStart)
						.match(separatorRegex)[0].length;
			
			push({
				type: 'separator',
				start: separatorStart,
				end: separatorEnd,
				data: text.substring(separatorStart, separatorEnd)
			});

			cur = separatorEnd;
		} else if (text[cur] == ']') {
			var currentLevel = state.levels[state.levels.length - 1] || 0;
			
			if (currentLevel == 0) {
				var rbmAtRootStart = cur;
				for (cur++; cur < text.length; cur++) {
					if (text[cur] != ']') break;
				}
				var rbmAtRootEnd = cur;

				push({
					type: 'mismatched right boundary marker',
					start: rbmAtRootStart,
					end: rbmAtRootEnd,
					data: text.substring(rbmAtRootStart, rbmAtRootEnd)
				});
				continue;
			}

			var rbmStart = cur;
			for (cur++; cur - rbmStart < currentLevel
					&& cur < text.length; cur++) {
				if (text[cur] != ']') break;
			}
			var rbmEnd = cur;

			if (rbmEnd - rbmStart < currentLevel) {
				push({
					type: 'text',
					start: rbmStart,
					end: rbmEnd,
					data: text.substring(rbmStart, rbmEnd)
				});

				continue;
			}

			push({
				type: 'right boundary marker',
				start: rbmStart,
				end: rbmEnd,
				data: text.substring(rbmStart, rbmEnd),
				level: rbmEnd - rbmStart
			});

			state.levels.pop();
		} else /* none of '[', ']', '`' */ {
			// reduce text normalization overhead
			var textStart = cur;
			for (cur++; cur < text.length; cur++) {
				if (['[', ']', '`'].includes(text[cur])) break;
			}
			var textEnd = cur;
			push({
				type: 'text',
				start: textStart,
				end: textEnd,
				data: text.substring(textStart, textEnd)
			});
		}
	}
	
	// close the unclosed
	for (var i = state.levels.length - 1; i >= 0; i--) {
		var type = state.levels[i] > 0
				? 'right boundary marker'
				: 'right verbatim marker';
		var absLevel = state.levels[i] > 0
				? state.levels[i] : -state.levels[i];

		push({
			type: type,
			start: text.length,
			end: text.length,
			data: '',
			level: absLevel
		});
	}

	return state.stack;
}

function generateASTFromParseTree(pt) {
	function recurse(pt) {
		var ast = pt.map(e => {
			switch (e.type) {
				case 'text':
					return {
						type: 'text',
						text: e.data
					};
				case 'verbatim':
					return {
						type: 'text',
						text: e.children[1].data
					};
				case 'element':
					return {
						type: 'element',
						name: e.children[1].data,
						code: e.data,
						children: recurse(e.children.slice(3, -1))
					};
				case 'mismatched right boundary marker':
					return {
						type: 'error',
						text: e.data
					};
				default:
					throw new TypeError(`Unknown type: ${e.type}`);
			}
		});

		return ast;
	};

	return recurse(pt);
}

module.exports = {
	generateParseTreeFromInput,
	generateASTFromParseTree
};
