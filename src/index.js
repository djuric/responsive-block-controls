import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const withResponsiveBlockControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		return (
			<>
				<BlockEdit key="edit" {...props} />
				<InspectorControls>
					<PanelBody title={__('Responsive Controls', 'responsive-block-controls')}>
						<p>Responsive block controls options</p>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withResponsiveBlockControls');

wp.hooks.addFilter('editor.BlockEdit', 'responsive-block-controls/responsive-block-controls', withResponsiveBlockControls);
