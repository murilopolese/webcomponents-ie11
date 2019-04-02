import BaseElement from './base-element.js'

class MyComponent extends BaseElement {
	template() {
		return `
		<style>
			#wrapper {
				display: flex;
				background: navy;
				color: grey;
				min-width: 100vw;
				min-height: 100vh;
				font-family: monospace;
			}
			#wrapper tt {
				font-family: monospace;
			}
		</style>
		<div id="wrapper">
			<h1>This is a fabulous website</h1>
		</div>
		`
	}
}
customElements.define('my-component', MyComponent)
