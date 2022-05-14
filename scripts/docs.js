import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import webpackConfig from './utils/webpack.config-docs';

console.log('Creating documentation');

const directory = path.join(process.cwd(), 'docs-dist');

fs.rmSync(directory, {
  recursive: true,
  force: true
});

const compiler = webpack(merge(webpackConfig, {
  mode: 'production'
}));

compiler.run((error, stats) => {
  if (error) {
    console.error(error);

    process.exit(1);
  }

  console.log(stats.toString({
    colors: true,
    children: false,
    modules: false,
    version: false,
    chunks: false,
    warnings: false,
  }));
});
