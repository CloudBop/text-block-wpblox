import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
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
		...blockData.attributes,
		text: {
			type: 'string',
			source: 'html',
			// here I am
			selector: 'h4',
		},
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
