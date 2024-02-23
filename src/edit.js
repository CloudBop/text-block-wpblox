/* eslint-disable no-console */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

/**
 * This package includes a library of generic WordPress components to be used for creating
 * common UI elements shared between screens and features of the WordPress dashboard.
 * Gutenberg
 *
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */

// import {
// 	PanelBody,
// 	TextControl,
// 	TextareaControl,
// 	ToggleControl,
// 	AnglePickerControl,
// 	ColorPicker,
// 	ColorPalette,
// } from '@wordpress/components';

// import {
// 	// ToolbarGroup,
// 	// ToolbarButton,
// 	// ToolbarDropdownMenu,
// } from '@wordpress/components';

// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

const { __Visualizer: BoxControlVisualizer } = BoxControl;

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment, style } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [] }
			/>

			<div>
				<RichText
					className="text-box-title"
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'Your Text', 'text-box' ) }
					tagName="h4"
					allowedFormats={ [] }
				/>
				<BoxControlVisualizer
					values={ style && style.spacing && style.spacing.padding }
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</>
	);
}
/*
	{ /* WP allow us to use attribute = group 
		
		to enforce UI Block controls to appear in the correct WP UI order 



		for inline styling * 
			<BlockControls group="inline">
				<p>Inline Controls</p>
			</BlockControls>
			<BlockControls group="block">
				<p>Block Controls</p>
			</BlockControls>
*/
/*
<BlockControls
	group="other"
	controls={[
		{
			title: 'Button 1',
			icon: 'admin-generic',
			isActive: true,
			// onClick: () => console.log('Button 1 Clicked'),
		},
		{
			title: 'Button 2',
			icon: 'admin-collapse',
			// onClick: () => console.log('Button 2 Clicked'),
		},
	]}
>
	{ /* USING PRE_BUILT GUTENBERG-EDIOT-UI *}
	{text && (
		<ToolbarGroup>
			text
			<ToolbarButton
				title={__('Align Left', 'text-box')}
				icon="editor-alignleft"
			// onClick={() => console.log('Align Left')}
			/>
			<ToolbarButton
				title={__('Align Center', 'text-box')}
				icon="editor-aligncenter"
			// onClick={() => console.log('Align center')}
			/>
			<ToolbarButton
				title={__('Align Right', 'text-box')}
				icon="editor-alignright"
			// onClick={() => console.log('Align Right')}
			/>
			<ToolbarDropdownMenu
				icon="arrow-down-alt2"
				label={__('More Alignments', 'text-box')}
				controls={[
					{
						title: __('Wide', 'text-box'),
						icon: 'align-wide',
					},
					{
						title: __('Full', 'text-box'),
						icon: 'align-full-width',
					},
				]}
			/>
		</ToolbarGroup>
	)}
	<ToolbarGroup>
		<p>Group 2</p>
	</ToolbarGroup>
</BlockControls>*/
