const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}