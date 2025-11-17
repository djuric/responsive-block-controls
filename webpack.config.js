const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
  ...defaultConfig,
  entry: {
    editor: './src/index.js',
    frontend: './src/frontend.scss',
  },
};
