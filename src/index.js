/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TabPanel } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import breakpoints from './breakpoints';
import ResponsiveControls from './responsive-controls';
import './editor.scss';

const withResponsiveBlockControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		return (
			<>
				<BlockEdit key="edit" {...props} />
				<InspectorControls>
					<PanelBody title={__('Responsive Controls', 'responsive-block-controls')} initialOpen={true}>
						<TabPanel
							className="responsive-block-controls-tab-panel"
							activeClassName="responsive-block-controls-tab-panel__active"
							tabs={breakpoints.map((breakpoint) => ({
								name: breakpoint.name,
								title: breakpoint.label,
								className: `responsive-block-controls-tab-panel__${breakpoint.slug}`,
								icon: breakpoint.icon
							}))}
						>
							{(tab) => <ResponsiveControls blockProps={props} breakpoint={tab} />}
						</TabPanel>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withResponsiveBlockControls');

addFilter('editor.BlockEdit', 'responsive-block-controls/responsive-block-controls', withResponsiveBlockControls);

const registerResponsiveControlsAttribute = (settings) => {
	const responsiveStylesDefault = breakpoints.reduce((acc, breakpoint) => {
		return {
			...acc,
			[breakpoint.name]: {
				style: {
					padding: {
						top: '0',
						right: '0',
						bottom: '0',
						left: '0'
					},
					margin: {
						top: '0',
						right: '0',
						bottom: '0',
						left: '0'
					}
				}
			}
		}
	}, {});

	return {
		...settings,
		attributes: {
			...settings.attributes,
			responsiveStyles: {
				type: 'object',
				default: responsiveStylesDefault
			},
		},
	};
}

addFilter('blocks.registerBlockType', 'responsive-block-controls/responsive-block-controls-attribute', registerResponsiveControlsAttribute);
