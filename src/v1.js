import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import { omit } from 'lodash';
import blockData from '../block.json';
// overrule the updated versions with the old...
const v1 = {
	supports: {
		html: false,
		color: {
			background: true,
			text: true,
			gradients: true,
		},
		spacing: {
			padding: true,
		},
	},
	attributes: {
		// remove updated attribute name from obj
		...omit( blockData.attributes, [ 'textAlignment' ] ),
		// ... and revert to previous
		alignment: {
			type: 'string',
			default: 'left',
		},
		text: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
	},
	migrate: ( attributes ) => {
		return {
			// remove old attributes key
			...omit( attributes, [ 'alignment' ] ),
			// and update to new one
			textAlignment: attributes.alignment,
		};
	},
	save: ( { attributes } ) => {
		const { text, alignment, shadow, shadowOpacity } = attributes;

		const classes = classnames( `text-box-align-${ alignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );

		return (
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				// here
				tagName="h4"
				value={ text }
			/>
		);
	},
};

export default v1;
