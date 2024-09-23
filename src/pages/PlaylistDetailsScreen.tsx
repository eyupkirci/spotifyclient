import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';

import {IArtist, IPlaylistTrackItem} from '../types/types';
import IsLoading from '../components/IsLoading';
import TrackList from '../components/TrackList';
import useFetchData from '../hooks/useFetchData';
import {CardImage} from '../components/Card';
import SearchInput from '../components/SearchInput';
import SortControls from '../components/SortControls';
import Button from '../components/Button';
import {AppContext} from '../context';
import {RootStackParamList} from '../navigation/AppNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type PlaylistDetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const PlaylistDetailsScreen = ({
  route,
  navigation,
}: {
  route: PlaylistDetailsScreenRouteProp;
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const {data: playlist} = route.params;
  const {theme, colors, toggleTheme} = useContext(AppContext);

  const {
    data: playlistTracks,
    error,
    isLoading,
  } = useFetchData(playlist.tracks.href);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTracks, setFilteredTracks] = useState<IPlaylistTrackItem[]>(
    [],
  );
  const [sortCriterion, setSortCriterion] = useState<'name' | 'artist'>('name');
  const [isSortAscending, setIsSortAscending] = useState<boolean>(true);

  useEffect(() => {
    if (playlistTracks) {
      const query = searchQuery.toLowerCase();
      let tracks = playlistTracks.items.filter((item: IPlaylistTrackItem) => {
        const trackName = item?.track?.name.toLowerCase();
        const artistNames = item?.track?.artists
          .map((artist: IArtist) => artist?.name.toLowerCase())
          .join(' ');
        return trackName?.includes(query) || artistNames?.includes(query);
      });

      tracks = tracks.sort((a: IPlaylistTrackItem, b: IPlaylistTrackItem) => {
        if (sortCriterion === 'name') {
          const nameA = a?.track?.name.toLowerCase();
          const nameB = b?.track?.name.toLowerCase();
          if (nameA < nameB) {
            return isSortAscending ? -1 : 1;
          }
          if (nameA > nameB) {
            return isSortAscending ? 1 : -1;
          }
        } else if (sortCriterion === 'artist') {
          const artistA = a?.track?.artists[0]?.name;
          const artistB = b?.track?.artists[0]?.name;
          if (artistA < artistB) {
            return isSortAscending ? -1 : 1;
          }
          if (artistA > artistB) {
            return isSortAscending ? 1 : -1;
          }
        }
        return 0;
      });

      setFilteredTracks(tracks);
    }
  }, [searchQuery, playlistTracks, sortCriterion, isSortAscending]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={[styles.screen, {backgroundColor: colors.backgorund}]}>
      <Button
        variant="link"
        title={theme === 'dark' ? 'Light Mode Off' : 'Light Mode On'}
        onPress={toggleTheme}
        containerStyle={styles.ThemeButton}
      />
      <Button
        variant="link"
        onPress={() => navigation?.navigate('Home')}
        containerStyle={styles.BackButton}>
        <Image
          tintColor={colors.text}
          source={require('../assets/feather_chevron-left.png')}
        />
      </Button>
      <CardImage item={playlist} imageStyle={styles.playlistArt} />
      <Text
        numberOfLines={2}
        style={[styles.playlistTitle, {color: colors.text}]}>
        {playlist.name}
      </Text>
      <Text style={[styles.playlistDescription, {color: colors.text}]}>
        {playlist.description}
      </Text>
      <SearchInput
        placeholder="Search tracks..."
        placeholderTextColor="gray"
        value={searchQuery}
        onClear={() => setSearchQuery('')}
        onChangeText={setSearchQuery}
      />
      <SortControls
        sortCriterion={sortCriterion}
        isSortAscending={isSortAscending}
        onSortCriterionChange={setSortCriterion}
        onSortOrderChange={setIsSortAscending}
      />

      <TrackList data={filteredTracks} />
    </View>
  );
};

export default PlaylistDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playlistTitle: {fontSize: 16, fontWeight: '700'},
  playlistDescription: {fontSize: 9},
  playlistArt: {borderRadius: 5, width: 200, height: 200},
  BackButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  ThemeButton: {alignSelf: 'flex-end'},
});
