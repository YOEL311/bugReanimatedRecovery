jest.doMock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

// const NOOP = () => {};
// const mock = require('react-native-reanimated/mock');
// jest.doMock('react-native-reanimated', () => {
//   return {
//     ...mock,
//     SlideInDown: {
//       duration: NOOP,
//     },
//   };
// });
