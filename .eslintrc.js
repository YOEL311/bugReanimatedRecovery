module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ["reanimated"],
  parserOptions: {
    "project": "./tsconfig.json"
  },
  rules: {
    "reanimated/js-function-in-worklet": 2,
    
  }
};
