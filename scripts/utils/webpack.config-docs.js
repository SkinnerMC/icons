import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const { DefinePlugin, ProvidePlugin } = webpack;

import { iconsMap } from './icons';

export default {
  entry: './src/docs/index.js',
  output: {
    path: path.resolve(process.cwd(), 'docs'),
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        resolve: {
          fullySpecified: false
        },
        use: [{
          loader: 'swc-loader',
          options: {
            jsc: {
                parser: {
                    jsx: true,
                }
            }
          }
        }],
      },
      {
        test: /\.(otf|svg)/,
        use: 'file-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/docs/index.html',
      title: 'Skinner Icons',
      hash: true,
      scriptLoading: 'blocking',
    }),
    new ProvidePlugin({
      React: 'react',
    }),
    new DefinePlugin({
      'window.ICONS': JSON.stringify(iconsMap())
    })
  ],
  mode: 'development',
  cache: {
    type: 'filesystem',
  }
};
