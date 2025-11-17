/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
  __experimentalToolsPanelItem as ToolsPanelItem,
  Button,
  ButtonGroup,
  BaseControl,
} from '@wordpress/components';

/**
 * Internal dependencies.
 */
import {
  getClassNameStyleValue,
  getUpdatedClassNameStyle,
} from '../../utils/class-name-style';

const WIDTH_VALUES = ['25', '50', '75', '100'];

const getActiveValue = (className, breakpoint) => {
  return getClassNameStyleValue(
    className,
    'button-width',
    WIDTH_VALUES,
    breakpoint
  );
};

const getUpdatedClassNames = (className, value, breakpoint) => {
  return getUpdatedClassNameStyle(
    className,
    'button-width',
    value,
    WIDTH_VALUES,
    breakpoint
  );
};

function ButtonWidth({
  blockProps: {
    setAttributes,
    attributes: { className },
    name,
  },
  breakpoint,
}) {
  if (name !== 'core/button') return null;

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
      label={__('Button Width', 'responsive-block-controls')}
      panelId={breakpoint.name}
      hasValue={() => !!activeValue}
      onDeselect={() => update(false)}
    >
      <BaseControl
        label={__('Button Width', 'responsive-block-controls')}
        __nextHasNoMarginBottom
      >
        <ButtonGroup>
          {WIDTH_VALUES.map(value => (
            <Button
              key={value}
              isPressed={activeValue === value}
              onClick={() => update(value)}
            >
              {value}%
            </Button>
          ))}
        </ButtonGroup>
      </BaseControl>
    </ToolsPanelItem>
  );
}

export default ButtonWidth;
