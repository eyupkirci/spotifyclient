import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {IArtist, IPlaylistTrackItem} from '../types/types';
import IsLoading from '../components/IsLoading';
import TrackList from '../components/TrackList';
import useFetchData from '../hooks/useFetchData';
import {CardImage} from '../components/Card';
import SearchInput from '../components/SearchInput';
import BackButton from '../components/BackButton';
import SortControls from '../components/SortControls';
import Button from '../components/Button';
import {ThemeContext} from '../context/theme';

type PlaylistDetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const PlaylistDetailsScreen = ({
  route,
}: {
  route: PlaylistDetailsScreenRouteProp;
}) => {
  const {data: playlist} = route.params;
  const {theme, toggleTheme} = useContext(ThemeContext);

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
    <View style={styles.screen}>
      <Button
        variant="contained"
        title={theme === 'dark' ? 'Light' : 'Dark'}
        onPress={toggleTheme}
      />
      <BackButton />
      <CardImage item={playlist} imageStyle={styles.playlistArt} />
      <Text numberOfLines={2} style={styles.playlistTitle}>
        {playlist.name}
      </Text>
      <Text style={styles.playlistDescription}>{playlist.description}</Text>
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
});
