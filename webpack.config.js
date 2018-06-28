/* eslint-env node */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const buildDir = 'docs';
const path = `${__dirname}/${buildDir}`;
const Dotenv = require('dotenv-webpack');


module.exports = env => ({

  entry: './src/index.js',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: './${buildDir}',
    historyApiFallback: true,
    proxy: { 
      '/api': 'http://localhost:3000' 
    },
  },
  node: {
    fs: 'empty'
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(`${path}/bundle.*.js`), 
    new HtmlPlugin({ template: './src/index.html' }),
    new Dotenv()
  ],
  module: {
    rules: [
      {   
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1 
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 5000 },
        },
      }
    ]
  }
});