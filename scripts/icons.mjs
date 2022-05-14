import fs from 'fs';
import path from 'path';

import { optimize } from './optimize';
import { iconsMap, sortArrayAlphabetically, symbol } from './utils';

console.time('Generating icons');

const currentWorkDir = process.cwd();

const ICONS_PATH = 'icons';
const DIST_FOLDER = 'dist';
const DIST_TS = 'ts';
const DIST_TS_ICONS = `${DIST_TS}/${ICONS_PATH}`;

console.time('Creating icons map');
const icons = iconsMap();
console.timeEnd('Creating icons map');

for (const dir of [DIST_FOLDER, DIST_TS, DIST_TS_ICONS]) {
    const isDirExist = fs.existsSync(path.join(currentWorkDir, dir));

    if (isDirExist) {
        fs.rmSync(path.join(currentWorkDir, dir), {
            recursive: true,
            force: true
        });
    }

    fs.mkdirSync(path.join(currentWorkDir, dir));
}

const srcPaths = [
    'src/components',
    'src/hooks',
    'src/utils',
];

for (const srcPath of srcPaths) {
    copyRecursive(path.resolve(currentWorkDir, srcPath), path.join(DIST_TS, path.basename(srcPath)));
}

const indexExportsMap = {};

const iconsGeneratorTasks = icons.map(({ id, componentName }) => {
  const svg = fs.readFileSync(path.join(currentWorkDir, `src/assets/${id}.svg`), 'utf-8');

  return symbol({
      id,
      componentName,
      content: optimize(svg)
  })
      .then((result) => {
          const iconDir = path.join(currentWorkDir, DIST_TS_ICONS, id);

          if (!fs.existsSync(iconDir)) {
              fs.mkdirSync(iconDir);
          }

          fs.writeFileSync(path.join(iconDir, 'index.ts'), result);

          indexExportsMap[componentName] = `./${ICONS_PATH}/${id}`;
      });
});

Promise.all(iconsGeneratorTasks)
    .then(() => {
      console.time('Creating index exports');
      createIndexExports();
      console.timeEnd('Creating index exports');

      console.timeEnd('Generating icons');
      console.log(`Icons successfully generated in ${DIST_TS}!`);
    });

function createIndexExports() {
    const exports = [
        "export * from './components';"
    ];

    sortArrayAlphabetically(
        Object.keys(indexExportsMap)
    )
        .forEach((componentName) => {
            const path = indexExportsMap[componentName];

            exports.push(`export { default as ${componentName} } from '${path}';`);
        });

    const code = exports.join('\n');

    fs.writeFileSync(path.resolve(DIST_TS, 'index.ts'), code);
}

function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src)
            .forEach((childItemName) => (
                copyRecursive(path.join(src, childItemName), path.join(dest, childItemName))
            ));

        return;
    }

    fs.copyFileSync(src, dest);
}
