import Element, { ElementDisplayType, isElementDisplayType, Nested } from "./Element";
import Node from "./Node";

export interface ElementClassArgumentType {
	name: NonNullable<string>;
	display: ElementDisplayType;
	renderer: (el: Element, options) => Node;
	split?: string | any[];
}

export interface ElementClassInstantiateArgumentType {
	code: string;
	attributes: any[];
	children: Nested<Node>[];
	options: any;
}

export default class ElementClass {

	public readonly name: NonNullable<string>;
	public readonly display: ElementDisplayType;
	public readonly renderer: (el: Element, options) => Node;
	public readonly split: string[];

	constructor ({name, display, renderer, split}: ElementClassArgumentType) {
		if (!name) throw TypeError('You give arg0 a bad name');
		if (!isElementDisplayType(display))
			throw TypeError('arg0.display should be one of "inline", "leaf-block", or "container-block".');
		if (!(renderer instanceof Function))
			throw TypeError('arg0.render should be a function');

		[this.name, this.display] = [name, display];

		this.renderer = (el, options) => {
			if (!(el instanceof Element))
				throw TypeError('arg0 should be an instance of m42kup.renderer.Element');
			return renderer(el, options);
		};

		if (!split) split = [];
		if (typeof split == 'string') split = [split];

		if (!(split instanceof Array))
			throw TypeError('arg0.split should be either undefined, a string, or an array');

		this.split = split;
	}

	public instantiate({code, attributes, children, options}: ElementClassInstantiateArgumentType) {
		return new Element({
			name: this.name,
			display: this.display,
			renderer: this.renderer,
			split: this.split,
			code,
			attributes,
			children,
			options
		});
	};
}