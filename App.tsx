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
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {
  runOnUI,
  scrollTo,
  useAnimatedRef,
} from 'react-native-reanimated';

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

  const flatListRef = useAnimatedRef<Animated.FlatList<string>>();

  const sectionListRef = useAnimatedRef<SectionList<string>>();

  const scrollRef = useAnimatedRef<ScrollView>();

  const AnimatedSectionList = Animated.createAnimatedComponent(
    SectionList<string>,
  );

  const data = ['Step One', 'Step Two', 'Step Three', 'Step Four', 'Step Five'];

  const animationScrollTo = (
    ref:
      | React.RefObject<Animated.FlatList<string>>
      | React.RefObject<SectionList<string, DefaultSectionT>>,
  ) => {
    'worklet';
    scrollTo(ref, 0, Math.random() * 300, true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}
      />

      <Button
        title="pressMe"
        onPress={() => {
          runOnUI(animationScrollTo)(sectionListRef);
          runOnUI(animationScrollTo)(flatListRef);
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
        ref={sectionListRef}
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
