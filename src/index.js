/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

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

import { __ } from '@wordpress/i18n';
// import deprecated block interface
import v1 from './v1';
import v2 from './v2';
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
	deprecated: [
		// update validation of new attribute textAlignment to alignment
		v2,
		// revalidate out-of-date gutenberg content... EG if htmltag changes
		v1,
	], // left to right
	// variation of blocks, how gb mutates data in editr
	variations: [
		{
			name: 'blocks-course/gradient-text-box',
			title: __( 'Gradient Text Box' ),
			icon: 'wordpress',
			attributes: {
				gradient: 'red-to-blue',
				shadow: true,
			},
		},
	],
	transforms: {
		// from another block to text-block
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						textAlignment: align,
					} );
				},
			},
			{
				//  type textbox and then press enter to create a new block
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box', {
						shadow: true,
						gradient: 'red-to-blue',
					} );
				},
			},
			{
				//  type textbox and then press space to create a new block
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],
		to: [
			{
				type: 'block',
				// would be nice to reset colour styling
				blocks: [ 'core/paragraph' ],
				isMatch: ( { text } ) => {
					//  if there's no text then don't allow p transformation
					return text ? true : false;
				},
				transform: ( attributes ) => {
					// console.log("🚀 ~ attributes:", attributes)
					const { text, textAlignment } = attributes;

					return createBlock( 'core/paragraph', {
						content: text,
						align: textAlignment,
						// these won't chane on transform
						gradient: false,
						textColor: 'black',
					} );
				},
			},
		],
	},
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
