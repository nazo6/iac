/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint-env node */

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

const appDirectory = path.resolve(__dirname, './');

const dev = {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(appDirectory, 'dist/development'),
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(appDirectory, 'dist/development'),
    port: 9000,
    writeToDisk: true,
    historyApiFallback: {
      rewrites: [{ from: /^\/*/, to: '/index.html' }],
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'typeof process': JSON.stringify('object'),
      'process.env.IS_REACT_EXPERIMENTAL': false,
    }),
  ],
};

const result = merge(common, dev);
result.module.rules[0].use[0].options.plugins.push(
  require.resolve('react-refresh/babel'),
);

fs.rmdirSync(path.resolve(__dirname, './dist/development'), { recursive: true });

module.exports = result;
