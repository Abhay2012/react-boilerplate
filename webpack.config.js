const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const webpack = require('webpack');
const widgetBundles = require('./widgetBundles');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const bundlesToEntry = () => {
  const entries = {};
  widgetBundles.forEach(bundle => {
    entries[bundle.name] = glob
      .sync('build/static/?(js|css)/*.?(js|css)')
      .filter(f => f.includes(bundle.name))
      .map(f => path.resolve(__dirname, f));
  });
  return entries;
};

module.exports = {
  entry: {
    ...bundlesToEntry(),
    vendor: './build/vendor.js',
  },
  output: {
    filename: 'build/[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static', //was server
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 9124,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: './../report/bundle_anlaysis.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'gzip',
      // Automatically open report in default browser
      openAnalyzer: true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info',
    }),
    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks
  ],
};
