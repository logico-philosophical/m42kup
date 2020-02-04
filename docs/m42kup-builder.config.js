var m42kup = require('m42kup');
var hljs = require('highlight.js');
var katex = require('katex');

m42kup.set({hljs, katex});

function render(text) {
	return m42kup.render(text);
}

module.exports = {
	name: 'M42/markup의 문서화',
	src: 'src',
	dst: 'build',
	template: './template.ejs',
	render,
	list: [
		{
			name: '시작하기',
			dir: 'getting-started',
			list: [
				{
					name: 'M42/markup 소개',
					file: 'introduction'
				},
				{
					name: '기본적인 사용법',
					file: 'basic-usage'
				}
			]
		},
		{
			name: 'API 명세',
			dir: 'api',
			list: [
				{
					name: '렌더링 옵션',
					file: 'options'
				},
				{
					name: '입출력 형식',
					file: 'formats'
				},
				{
					name: 'm42kup API',
					file: 'm42kup'
				},
				{
					name: 'm42kup.parser API',
					file: 'm42kup.parser'
				},
				{
					name: 'm42kup.renderer API',
					file: 'm42kup.renderer'
				},
				{
					name: 'm42kup.highlighter API',
					file: 'm42kup.highlighter'
				}
			]
		}
	]
};