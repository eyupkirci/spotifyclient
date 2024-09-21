import React, {FC, useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Featured from '../components/Featured';
import YourPlaylists from '../components/YourPlaylists';
import Header from '../components/Header';
import Search from '../components/Search';
import {ColorPalette, ThemeContext} from '../context/theme';

const PlaylistScreen: FC = () => {
  const {theme} = useContext(ThemeContext);
  const Color = ColorPalette[theme];

  return (
    <ScrollView>
      <View style={[styles.screen, {backgroundColor: Color.backgorund}]}>
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
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'column',
  },
});
