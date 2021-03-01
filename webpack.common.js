/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint-env node */

const path = require('path');

const rendererDirectory = __dirname;

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.resolve(rendererDirectory, 'src/index.tsx')],

  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.(html?)$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rendererDirectory, 'src/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.html'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
};
