/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { __experimentalToolsPanel as ToolsPanel } from '@wordpress/components';

/**
 * Internal dependencies.
 */
import AlignText from './elements/align-text';
import AlignContent from './elements/align-content';
import Display from './elements/display';
import Padding from './elements/padding';
import Margin from './elements/margin';
import ColumnsDirection from './elements/columns-direction';
import { getClearedClassNameStyle } from '../utils/class-name-style';

/**
 * Responsive controls that are using class names to apply styles.
 */
const CONTROLS_STYLES_SUPPORT = [
  'display',
  'text-align',
  'align',
  'columns-direction',
];

function ResponsiveControls({ blockProps, breakpoint }) {
  /**
   * Remove all class names that are not in CONTROLS_STYLES_SUPPORT. This is used for controls that are making use
   * of class names to apply styles.
   */
  const resetClassNames = () => {
    const updatedClassNames = CONTROLS_STYLES_SUPPORT.reduce(
      (acc, styleName) => {
        return getClearedClassNameStyle(acc, styleName, breakpoint.name);
      },
      blockProps.attributes.className
    );

    blockProps.setAttributes({
      className: updatedClassNames,
    });
  };

  return (
    <ToolsPanel
      className="responsive-block-controls-tools-panel"
      label={`${breakpoint.title} screens`}
      panelId={breakpoint.name}
      resetAll={callbacks => {
        resetClassNames();

        // Only execute callbacks that are not empty functions.
        callbacks
          .filter(cb => cb.toString() !== '() => {}')
          .forEach(cb => cb());
      }}
    >
      <AlignText blockProps={blockProps} breakpoint={breakpoint} />
      <Display blockProps={blockProps} breakpoint={breakpoint} />
      <AlignContent blockProps={blockProps} breakpoint={breakpoint} />
      <Padding blockProps={blockProps} breakpoint={breakpoint} />
      <Margin blockProps={blockProps} breakpoint={breakpoint} />
      <ColumnsDirection blockProps={blockProps} breakpoint={breakpoint} />
    </ToolsPanel>
  );
}

export default ResponsiveControls;
