const path = require('path');

module.exports = ({config}) => {
  config.resolve.alias = {
    'app-constants': path.resolve(__dirname, '../src/app-constants'),
    components: path.resolve(__dirname, '../src/components'),
    helpers: path.resolve(__dirname, '../src/helpers'),
    themes: path.resolve(__dirname, '../src/themes'),
  }

  return config;
};
