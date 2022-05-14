import fs from 'fs';
import path from 'path';

export function sortArrayAlphabetically(array) {
  return array.sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string} dash
 * @return {string}
 */
function dashToCamel(dash) {
  const filenameParts = dash.split('_');

  return filenameParts.reduce((filename, piece) => {
    piece = `${piece.charAt(0).toUpperCase()}${piece.slice(1)}`;

    return `${filename}${piece}`;
  }, '');
}

/**
 *
 * @param {string} name
 */
function getIconComponentName(name) {
  return `Icon${dashToCamel(name)}`;
}

/**
 * @return {Array<{id: string; dirname: string, filename: string, componentName: string}>}
 */
export function iconsMap() {
    return fs.readdirSync(path.join(process.cwd(), 'src/assets'))
        .map((iconFilename) => {
            const [id] = iconFilename.split('.');

            return {
                id,
                componentName: getIconComponentName(id),
            };
        });
}
