# Responsive Block Controls

This plugin adds enhanced responsive controls to the block editor.

Intrinsic design is a core principle of WordPress block themes, but it doesn’t cover every use case. With this plugin, you gain additional control over elements that still require media queries — helping you fine-tune your designs across different screen sizes.

## Development

To start with development, clone the repository and set up a local WordPress environment. Then, follow these steps:

1. Install the required dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

## Publishing new version

After updating the plugin, we need to build the new files with `npm run build`. Then we need to bump the version and github tag the new version. This will ensure that package managers like composer that are being used on other projects will always pull the latest version of the plugin. To do that:

1. Make the changes and run `npm run build` to ensure the changes are saved in the build folder.

2. Update the plugin version in `responsive-block-controls.php`.

3. Update the plugin version in `package.json`.

4. Update changelog file `CHANGELOG.md` with relevant information.

5. Push the changes.

6. Tag new version in github:

```bash
git tag v1.1.0
```

Replace the version in the command above with the actual updated version from `responsive-block-controls.php` file.

7. Commit the updated file and push it by running the following:

```bash
git push origin v1.1.0
```

## Available Controls

| Control                                   | Status                 |
| ----------------------------------------- | ---------------------- |
| Text alignment                            | ✅ Implemented         |
| Show/hide element                         | ✅ Implemented         |
| Content width                             | ✅ Implemented         |
| Padding                                   | ✅ Implemented         |
| Margin                                    | ✅ Implemented         |
| Columns reverse                           | ✅ Implemented         |
| Button width                              | ✅ Implemented         |
| Alternate image for different breakpoints | ❌ Not yet implemented |

## TODO

- [ ] Add support for wide and content align
- [ ] Fix the display of align content in editor
- [ ] Fix marging styles beeing overriden by constrained layout styles
- [ ] Hide controls that are not supported by the block type:
  - [ ] `const blockType = getBlockType(blockProps.name); getBlockSupport(blockType.name, 'align')`
  - [ ] `getBlockSupport(blockType.name, 'alignWide')`
  - [ ] `const isTextAlignSupported = blockType.attributes.align || blockType.attributes.alignWide;`
