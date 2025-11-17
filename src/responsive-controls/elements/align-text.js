/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
  __experimentalToolsPanelItem as ToolsPanelItem,
  Button,
  BaseControl,
} from '@wordpress/components';
import { Icon, alignLeft, alignCenter, alignRight } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import {
  getClassNameStyleValue,
  getUpdatedClassNameStyle,
} from '../../utils/class-name-style';

const STYLE_VALUES = ['left', 'center', 'right'];

const getActiveValue = (className, breakpoint) => {
  return getClassNameStyleValue(
    className,
    'text-align',
    STYLE_VALUES,
    breakpoint
  );
};

const getUpdatedClassNames = (className, value, breakpoint) => {
  return getUpdatedClassNameStyle(
    className,
    'text-align',
    value,
    STYLE_VALUES,
    breakpoint
  );
};

function AlignText({
  blockProps: {
    setAttributes,
    attributes: { className },
  },
  breakpoint,
}) {
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
      label={__('Align Text', 'responsive-block-controls')}
      panelId={breakpoint.name}
      hasValue={() => !!activeValue}
      onDeselect={() => update(false)}
    >
      <BaseControl
        label={__('Align Text', 'responsive-block-controls')}
        __nextHasNoMarginBottom
      >
        <Button
          isPressed={activeValue === 'left'}
          onClick={() => update('left')}
          label={__('Left', 'responsive-block-controls')}
          icon={<Icon icon={alignLeft} />}
        />
        <Button
          isPressed={activeValue === 'center'}
          onClick={() => update('center')}
          label={__('Center', 'responsive-block-controls')}
          icon={<Icon icon={alignCenter} />}
        />
        <Button
          isPressed={activeValue === 'right'}
          onClick={() => update('right')}
          label={__('Right', 'responsive-block-controls')}
          icon={<Icon icon={alignRight} />}
        />
      </BaseControl>
    </ToolsPanelItem>
  );
}

export default AlignText;
