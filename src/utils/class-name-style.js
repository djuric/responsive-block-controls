/**
 * WordPress dependencies.
 */
import TokenList from '@wordpress/token-list';

/**
 * The prefix for all responsive block controls styles.
 */
const STYLE_PREFIX = 'is-style-rbc';

/**
 * Given a className, styleName, styleValues, and breakpoint, returns the selected styleValue.
 *
 * @param {string} className The class names of the block.
 * @param {string} styleName The name of the style.
 * @param {Array<string>} styleValues The possible values for the style.
 * @param {string} breakpoint The name of the breakpoint.
 *
 * @return {string} The selected styleValue.
 */
export function getClassNameStyleValue(
  className,
  styleName,
  styleValues,
  breakpoint
) {
  const list = new TokenList(className);

  return styleValues.find(styleValue =>
    list.contains(`${STYLE_PREFIX}-${breakpoint}-${styleName}--${styleValue}`)
  );
}

/**
 * Given a className, styleName, styleValue, styleValues, and breakpoint, returns an updated className with the new styleValue.
 *
 * @param {string} className The class names of the block.
 * @param {string} styleName The name of the style.
 * @param {string} styleValue The new value for the style.
 * @param {Array<string>} styleValues The possible values for the style.
 * @param {string} breakpoint The name of the breakpoint.
 *
 * @return {string} The updated className with the new styleValue.
 */
export function getUpdatedClassNameStyle(
  className,
  styleName,
  styleValue,
  styleValues,
  breakpoint
) {
  const list = new TokenList(className);

  styleValues.forEach(value =>
    list.remove(`${STYLE_PREFIX}-${breakpoint}-${styleName}--${value}`)
  );

  if (styleValue) {
    list.add(`${STYLE_PREFIX}-${breakpoint}-${styleName}--${styleValue}`);
  }

  return list.value;
}

/**
 * Return updated class names that start with the given styleName for the specified breakpoint.
 *
 * @param {string} className The class names of the block.
 * @param {string} styleName The name of the style to clear.
 * @param {string} breakpoint The name of the breakpoint.
 * @returns
 */
export function getClearedClassNameStyle(className, styleName, breakpoint) {
  const list = new TokenList(className);

  list.forEach(token => {
    if (token.startsWith(`${STYLE_PREFIX}-${breakpoint}-${styleName}--`)) {
      list.remove(token);
    }
  });

  return list.value;
}
