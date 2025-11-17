/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
  __experimentalToolsPanelItem as ToolsPanelItem,
  ToggleControl,
  BaseControl,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import {
  getClassNameStyleValue,
  getUpdatedClassNameStyle,
} from '../../utils/class-name-style';

const STYLE_VALUES = ['reverse'];

const getActiveValue = (className, breakpoint) => {
  return getClassNameStyleValue(
    className,
    'columns-direction',
    STYLE_VALUES,
    breakpoint
  );
};

const getUpdatedClassNames = (className, value, breakpoint) => {
  return getUpdatedClassNameStyle(
    className,
    'columns-direction',
    value,
    STYLE_VALUES,
    breakpoint
  );
};

function ColumnsDirection({
  blockProps: {
    setAttributes,
    attributes: { className },
    name,
  },
  breakpoint,
}) {
  if (name !== 'core/columns') return null;

  const activeValue = getActiveValue(className, breakpoint.name);

  const update = value => {
    const styleValue = value === activeValue ? false : value;
    const updatedClassName = getUpdatedClassNames(
      className,
      styleValue,
      breakpoint.name
    );

    setAttributes({ className: updatedClassName });
  };

  return (
    <ToolsPanelItem
      label={__('Columns Direction', 'responsive-block-controls')}
      panelId={breakpoint.name}
      hasValue={() => activeValue === 'reverse'}
      onDeselect={() => update(false)}
    >
      <BaseControl
        label={__('Columns Direction', 'responsive-block-controls')}
        __nextHasNoMarginBottom
      >
        <ToggleControl
          __nextHasNoMarginBottom
          label={__('Reverse', 'responsive-block-controls')}
          checked={activeValue === 'reverse'}
          onChange={newValue => update(newValue ? 'reverse' : false)}
        />
      </BaseControl>
    </ToolsPanelItem>
  );
}

export default ColumnsDirection;
