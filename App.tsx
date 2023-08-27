/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  DefaultSectionT,
  SafeAreaView,
  SectionList,
  SectionListProps,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  AnimatedRef,
  AnimateProps,
  runOnUI,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {mixColor} from 'react-native-redash';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const AnimatedSectionList = Animated.createAnimatedComponent(
    SectionList<string>,
  );
  const flatListRef = useAnimatedRef<Animated.FlatList<string>>();

  const animatedSectionListRef =
    useAnimatedRef<InstanceType<typeof AnimatedSectionList>>();

  const data = ['Step One', 'Step Two', 'Step Three', 'Step Four', 'Step Five'];

  scrollTo(animatedSectionListRef, 0, Math.random() * 300, true);

  scrollTo(flatListRef, 0, Math.random() * 300, true);

  const animationScrollToFlat = (
    ref: AnimatedRef<Animated.FlatList<string>>,
  ) => {
    'worklet';
    scrollTo(ref, 0, Math.random() * 300, true);
  };

  const animationScrollToSection = (
    ref: AnimatedRef<
      React.Component<
        AnimateProps<SectionListProps<string, DefaultSectionT>>,
        unknown,
        unknown
      >
    >,
  ) => {
    'worklet';
    scrollTo(ref, 0, Math.random() * 300, true);
  };
  const sharedAnimation = useSharedValue(1);

  useSharedValue(() => {});

  const backgroundColorAnimStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: mixColor(sharedAnimation.value, '#00001', '#12345'),
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header />
      <Animated.View style={backgroundColorAnimStyle} />

      <Button
        title="pressMe"
        onPress={() => {
          runOnUI(animationScrollToSection)(animatedSectionListRef);
          runOnUI(animationScrollToFlat)(flatListRef);
        }}
      />

      <Animated.FlatList
        ref={flatListRef}
        renderItem={({item}) => {
          return (
            <Section title="Section List">
              Read the docs to discover what to do next: {item}
            </Section>
          );
        }}
        data={data}
      />

      <AnimatedSectionList
        renderItem={({item}) => {
          return (
            <Section title="FlatLIst">
              Read the docs to discover what to do next: {item}
            </Section>
          );
        }}
        ref={animatedSectionListRef}
        sections={[{data}]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
