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
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	withColors,
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

function Edit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { text, alignment } = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				></PanelColorSettings>
				<ContrastChecker
					textColor={ textColor.color }
					backgroundColor={ backgroundColor.color }
				/>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			{ /*  */ }
			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				} ) }
				// save state on change
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [ 'core/bold' ] }
			/>
		</>

		// <p { ...useBlockProps() }>
		// 	{ __(
		// 		'Boilerplateblox – hello from the editor!',
		// 		'boilerplateblox'
		// 	) }
		// </p>
	);
}

//
// will allow theme colour class namaes to be passed from sidebar inspector into FE
//
export default withColors( {
	backgroundColor: 'backgroundColor',
	textColor: 'color',
} )( Edit );

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
