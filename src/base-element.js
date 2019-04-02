class BaseElement extends HTMLElement {
	static get observedAttributes() {
		return [];
	}
	constructor() {
		super()
		const shadowRoot = this.attachShadow({ mode: 'open' })
	}
	connectedCallback() {
		this.render()
	}
	render() {
		this.shadowRoot.innerHTML = this.template()
	}
	template() {
		return ''
	}
	get(attr) {
		if(this.hasAttribute(attr)) {
			return this.getAttribute(attr)
		} else {
			return ''
		}
	}
}

export default BaseElement
