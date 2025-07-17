# Responsive Block Controls

This plugin adds enhanced responsive controls to the block editor.

Intrinsic design is a core principle of WordPress block themes, but it doesn’t cover every use case. With this plugin, you gain additional control over elements that still require media queries — helping you fine-tune your designs across different screen sizes.

## Available Controls

| Control                                   | Status                   |
| ----------------------------------------- | ------------------------ |
| Text alignment                            | ✅ Implemented           |
| Show/hide element                         | ✅ Implemented           |
| Content width                             | 🟡 Partially implemented |
| Padding                                   | ✅ Not yet implemented   |
| Margin                                    | 🟡 Partially implemented |
| Alternate image for different breakpoints | ❌ Not yet implemented   |

## TODO

- [ ] Add support for wide and content align
- [ ] Fix the display of align content in editor
- [ ] Fix marging styles beeing overriden by constrained layout styles
- [ ] Hide controls that are not supported by the block type:
  - [ ] `const blockType = getBlockType(blockProps.name); getBlockSupport(blockType.name, 'align')`
  - [ ] `getBlockSupport(blockType.name, 'alignWide')`
  - [ ] `const isTextAlignSupported = blockType.attributes.align || blockType.attributes.alignWide;`
