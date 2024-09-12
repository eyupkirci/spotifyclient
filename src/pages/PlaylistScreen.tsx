import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeaturedPlaylists from '../components/FeaturedPlaylists';
import SearchBar from '../components/SearchBar';
import CategoryPlaylists from '../components/CategoryPlaylists';

const PlaylistScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <SearchBar />
      <FeaturedPlaylists />
      <CategoryPlaylists />
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
