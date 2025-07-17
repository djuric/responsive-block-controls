/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __experimentalToolsPanelItem as ToolsPanelItem, ToggleControl, BaseControl } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import { getClassNameStyleValue, getUpdatedClassNameStyle } from '../../utils/class-name-style'

const STYLE_VALUES = [
    'none'
];

const getActiveValue = (className, breakpoint) => {
    return getClassNameStyleValue(className, 'display', STYLE_VALUES, breakpoint);
}

const getUpdatedClassNames = (className, value, breakpoint) => {
    return getUpdatedClassNameStyle(className, 'display', value, STYLE_VALUES, breakpoint);
}

function Display({ blockProps: { setAttributes, attributes: { className } }, breakpoint }) {
    const activeValue = getActiveValue(className, breakpoint.name);

    const update = (value) => {
        const styleValue = value === activeValue ? false : value;
        const updatedClassName = getUpdatedClassNames(className, styleValue, breakpoint.name);

        setAttributes({ className: updatedClassName });
    }

    return <ToolsPanelItem
        label={__('Visibility', 'responsive-block-controls')}
        panelId={breakpoint.name}
        hasValue={() => activeValue === 'none'}
        onDeselect={() => update(false)}
    >
        <BaseControl
            label={__('Visiblity', 'responsive-block-controls')}
            __nextHasNoMarginBottom
        >
            <ToggleControl
                __nextHasNoMarginBottom
                label={__('Hidden', 'responsive-block-controls')}
                checked={activeValue === 'none'}
                onChange={(newValue) => update(newValue ? 'none' : false)}
            />
        </BaseControl>
    </ToolsPanelItem>;
}

export default Display;
