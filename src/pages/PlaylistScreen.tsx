import React, {FC, useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Featured from '../components/Featured';
import YourPlaylists from '../components/YourPlaylists';
import Header from '../components/Header';
import Search from '../components/Search';
import {ColorPalette, AppContext} from '../context';
import Button from '../components/Button';

const PlaylistScreen: FC = () => {
  const {theme, toggleTheme} = useContext(AppContext);
  const Color = ColorPalette[theme];

  return (
    <ScrollView>
      <View style={[styles.screen, {backgroundColor: Color.backgorund}]}>
        <Button
          variant="link"
          title={theme === 'dark' ? 'Light Mode Off' : 'Light Mode On'}
          onPress={toggleTheme}
          containerStyle={styles.themeButton}
        />
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
    paddingBottom: 65,
    display: 'flex',
    flexDirection: 'column',
  },
  themeButton: {alignSelf: 'flex-end'},
});
