const { browsersList } = require('../package');

module.exports = (api) => {
  if (api) {
    api.cache(true);
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: browsersList
          }
        }
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread'
    ]
  };
};
