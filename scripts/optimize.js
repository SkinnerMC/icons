import { optimize as svgo } from 'svgo';

/**
 * @param {string} svg
 * @return {string}
 */
export function optimize(svg) {
  return svgo(svg, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
    ],
  })
      .data;
}
