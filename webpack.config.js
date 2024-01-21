const path = require('path');
const version = require('./package.json').version;

// Custom webpack rules
const rules = [
  { test: /\.ts$/, loader: 'ts-loader' },
  {
    test: /\.(tsx|jsx)$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  { test: /\.js$/, loader: 'source-map-loader' },
  { test: /\.css$/, use: ['style-loader', 'css-loader'] },
  { test: /\.(svg)$/, use: ['file-loader'] },
];

// Packages that shouldn't be bundled but loaded at runtime
const externals = ['@jupyter-widgets/base'];

const resolve = {
  extensions: [".webpack.js", ".web.js", ".ts", ".js", ".tsx"]
};

module.exports = [
  /**
   * Notebook extension
   *
   * This bundle only contains the part of the JavaScript that is run on load of
   * the notebook.
   */
  {
    mode: "development",
    entry: './src/extension.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'nbsv', 'nbextension'),
      libraryTarget: 'amd',
      publicPath: '',
    },
    module: {
      rules: rules
    },
    devtool: 'source-map',
    externals,
    resolve,
  },

  /**
   * Embeddable nbsv bundle
   *
   * This bundle is almost identical to the notebook extension bundle. The only
   * difference is in the configuration of the webpack public path for the
   * static assets.
   *
   * The target bundle is always `dist/index.js`, which is the path required by
   * the custom widget embedder.
   */
  {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd',
        library: "nbsv",
        publicPath: 'https://unpkg.com/nbsv@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
        rules: rules
    },
    externals,
    resolve,
  },


  /**
   * Documentation widget bundle
   *
   * This bundle is used to embed widgets in the package documentation.
   */
  {
    entry: './src/index.ts',
    output: {
      filename: 'embed-bundle.js',
      path: path.resolve(__dirname, 'docs', 'source', '_static'),
      library: "nbsv",
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    devtool: 'source-map',
    externals,
    resolve,
  }

];
