const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    app: [
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server', // bundle the client for hot reloading
      './assets/js/main.js',
    ],
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }]],
          env: {
            test: {
              plugins: ['istanbul'],
            },
          },
        },
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), 'src'),
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['css-loader'],
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                })];
              },
            },
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|ogv|txt|mp3|ogg|wav|pdf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        use: ['url-loader?name=fonts/[name].[ext]'],
      },
    ],
  },
  devServer: {
    port: 3000,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    inline: true,
  },
  externals: {
    jquery: 'jQuery',
    ga: 'ga',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      ga: 'ga',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      open: false,
      proxy: 'http://localhost:4000/',
      files: [
        `./dist/**/*.html`,
        `./dist/assets/images/*.*`,
      ],
      notify: {
        styles: {
          top: 'auto',
          bottom: '-200px',
        },
      },
    }, {
      reload: false,
    }),
  ],
  output: {
    filename: 'bundle.[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/',
  },
};
