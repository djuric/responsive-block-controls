/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
  __experimentalToolsPanelItem as ToolsPanelItem,
  Button,
  BaseControl,
} from '@wordpress/components';
import { Icon, stretchFullWidth } from '@wordpress/icons';

/**
 * Internal dependencies.
 */
import {
  getClassNameStyleValue,
  getUpdatedClassNameStyle,
} from '../../utils/class-name-style';

const STYLE_VALUES = ['full'];

const getActiveValue = (className, breakpoint) => {
  return getClassNameStyleValue(className, 'align', STYLE_VALUES, breakpoint);
};

const getUpdatedClassNames = (className, value, breakpoint) => {
  return getUpdatedClassNameStyle(
    className,
    'align',
    value,
    STYLE_VALUES,
    breakpoint
  );
};

function AlignContent({
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
      label={__('Align Content', 'responsive-block-controls')}
      panelId={breakpoint.name}
      hasValue={() => activeValue === 'full'}
      onDeselect={() => update(false)}
    >
      <BaseControl
        label={__('Align Content', 'responsive-block-controls')}
        __nextHasNoMarginBottom
      >
        <Button
          isPressed={activeValue === 'full'}
          onClick={() => update('full')}
          label={__('Full width', 'responsive-block-controls')}
          icon={<Icon icon={stretchFullWidth} />}
        />
      </BaseControl>
    </ToolsPanelItem>
  );
}

export default AlignContent;
