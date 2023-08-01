module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'd.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native)',
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
  setupFilesAfterEnv: ['./jest-setup.js'],
};
