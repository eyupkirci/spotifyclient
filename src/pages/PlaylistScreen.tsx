import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import YourPlaylists from '../components/YourPlaylists';
import Header from '../components/Header';

const PlaylistScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <Header />
      <FeaturedPlaylists />
      <YourPlaylists />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});
