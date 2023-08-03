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
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Animated, {useAnimatedRef} from 'react-native-reanimated';

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

  const AnimatedSectionList = Animated.createAnimatedComponent(
    SectionList<string>,
  );

  const sectionListRef = useAnimatedRef<typeof AnimatedSectionList>();

  const data = ['Step One', 'Step Two', 'Step Three', 'Step Four', 'Step Five'];

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
          flatListRef.current?.scrollToIndex({
            index: Math.random() * (data.length - 1),
          });
        }}
      />

      <FlatList
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
