// import {doMock} from '@jest/globals';
// import a from 'react-native-reanimated/mock'

// require('react-native-reanimated').setUpTests();
import {jest} from '@jest/globals';
jest.doMock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
