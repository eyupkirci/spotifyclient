import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Featured from '../components/Featured';
import YourPlaylists from '../components/YourPlaylists';
import Header from '../components/Header';
import Search from '../components/Search';

const PlaylistScreen: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Header />
        <Search />
        <Featured />
        <YourPlaylists />
      </View>
    </ScrollView>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'column',
  },
});
