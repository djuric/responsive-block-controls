/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __experimentalSpacingSizesControl as SpacingSizesControl } from '@wordpress/block-editor';
import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';

function Padding({ blockProps: { setAttributes, attributes: { responsiveStyles } }, breakpoint }) {
    const { style: { padding } } = responsiveStyles[breakpoint.name];

    const update = (value) => {
        setAttributes({
            responsiveStyles: {
                ...responsiveStyles,
                [breakpoint.name]: {
                    ...responsiveStyles[breakpoint.name],
                    style: {
                        ...responsiveStyles[breakpoint.name].style,
                        padding: value
                    }
                }
            }
        });
    }

    const defaultPadding = {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
    };

    return <ToolsPanelItem
        label={__('Padding', 'responsive-block-controls')}
        panelId={breakpoint.name}
        hasValue={() => Object.values(padding).some(value => value !== '0')}
        onDeselect={() => update(defaultPadding)}
        resetAllFilter={() => update(defaultPadding)}
    >
        <SpacingSizesControl
            values={padding}
            onChange={value => update(value)}
            label={__('Padding', 'responsive-block-controls')}
        />
    </ToolsPanelItem>

}

export default Padding;
