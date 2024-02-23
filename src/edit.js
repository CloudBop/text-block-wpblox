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
	InspectorControls,
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

import {
	// eslint-disable-next-line
	// __experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';
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

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		text,
		alignment, //style,
		shadow,
		shadowOpacity,
	} = attributes;

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};
	const onChangeShadowOpacity = ( newShadowOpacity ) => {
		setAttributes( { shadowOpacity: newShadowOpacity } );
	};
	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody title={ __( 'Shadow Setting', 'text-box' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'text-box' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
							onChange={ onChangeShadowOpacity }
						/>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'text-box' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					className="text-box-title"
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'Your Text', 'text-box' ) }
					tagName="h4"
					allowedFormats={ [] }
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
