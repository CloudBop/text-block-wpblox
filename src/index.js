/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from '../block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */

//
// block.json
// "attributes": {
//  these arributes won't be stored in the gutenbrg delimiter as the src is in html content, it tells wordpress to parse the raw html.
// 	"text": {
// 		"type": "string",
// 			"source": "html",
// 				"selector": "h4"
// 	},
// 	"alignment": {
// 		"type": "string",
// 			"default": "left"
// 	},
// 	"backgroundColor": {
// 		"type": "string"
// 	},
// 	"textColor": {
// 		"type": "string"
// 	},

// necessary for custom color picker to be passed as style
// "customBackgroundColor": {
// 	"type": "string"
// },
// "customTextColor": {
// 	"type": "string"
// }
// }
//
registerBlockType( metadata.name, {
	icon: {
		src: 'text-page',
		// (
		// 	<svg
		// 		version="1.1"
		// 		viewBox="0 0 500 500"
		// 		preserveAspectRatio="xMinYMin meet"
		// 	>
		// 		<circle cx="250" cy="250" r="200" />
		// 	</svg>
		// )
		background: '#34060f',
		foreground: '#fff',
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );

/* block.json 
 these arributes won't be stored in the gutenbrg delimiter as the src is in html content, it tells wordpress to parse the raw html.

 // textcolor + bgc theme colors need BP wp doexn't support color.

"attributes": {
		"text": {
			"type": "string",
			"source": "html",
			"selector": "h4"
		},
		"alignment": {
			"type": "string",
			"default": "left"
		},
		"backgroundColor": {
			"type": "string"
		},
		"textColor": {
			"type": "string"
		}
	}
*/
