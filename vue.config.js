const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
      }),
    ],
    performance: {
      hints: false,
    },
    optimization: {
      splitChunks: {
        minSize: 100000,
        maxSize: 240000,
      },
    },
  },
};
