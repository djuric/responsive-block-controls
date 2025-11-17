/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __experimentalSpacingSizesControl as SpacingSizesControl } from '@wordpress/block-editor';
import { __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';

function Margin({
  blockProps: {
    setAttributes,
    attributes: { responsiveStyles },
  },
  breakpoint,
}) {
  const {
    style: { margin },
  } = responsiveStyles[breakpoint.name];

  const update = value => {
    setAttributes({
      responsiveStyles: {
        ...responsiveStyles,
        [breakpoint.name]: {
          ...responsiveStyles[breakpoint.name],
          style: {
            ...responsiveStyles[breakpoint.name].style,
            margin: value,
          },
        },
      },
    });
  };

  const defaultMargin = {
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
  };

  return (
    <ToolsPanelItem
      label={__('Margin', 'responsive-block-controls')}
      panelId={breakpoint.name}
      hasValue={() => Object.values(margin).some(value => value !== '0')}
      onDeselect={() => update(defaultMargin)}
      resetAllFilter={() => update(defaultMargin)}
    >
      <SpacingSizesControl
        values={margin}
        onChange={value => update(value)}
        label={__('Margin', 'responsive-block-controls')}
      />
    </ToolsPanelItem>
  );
}

export default Margin;
