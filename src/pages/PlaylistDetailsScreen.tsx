import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {IArtist, IPlaylistTrackItem} from '../types/types';
import IsLoading from '../components/IsLoading';
import TrackList from '../components/TrackList';
import useFetchData from '../hooks/useFetchData';

type PlaylistDetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

const PlaylistDetailsScreen = ({
  route,
}: {
  route: PlaylistDetailsScreenRouteProp;
}) => {
  const {data: playlist} = route.params;

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
        const trackName = item.track.name.toLowerCase();
        const artistNames = item.track.artists
          .map((artist: IArtist) => artist.name.toLowerCase())
          .join(' ');
        return trackName.includes(query) || artistNames.includes(query);
      });

      tracks = tracks.sort((a: IPlaylistTrackItem, b: IPlaylistTrackItem) => {
        if (sortCriterion === 'name') {
          const nameA = a.track.name.toLowerCase();
          const nameB = b.track.name.toLowerCase();
          if (nameA < nameB) {
            return isSortAscending ? -1 : 1;
          }
          if (nameA > nameB) {
            return isSortAscending ? 1 : -1;
          }
        } else if (sortCriterion === 'artist') {
          const artistA = a.track.artists[0].name;
          const artistB = b.track.artists[0].name;
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
      <Image
        source={{uri: playlist.images[0].url}}
        style={styles.playlistArt}
      />
      <Text numberOfLines={2} style={styles.playlistTitle}>
        {playlist.name}
      </Text>
      <Text style={styles.playlistDescription}>{playlist.description}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tracks..."
        placeholderTextColor="lightgray"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.sortControls}>
        <View style={styles.sortItemsGroup}>
          <Pressable
            style={[
              styles.sortItems,
              {opacity: sortCriterion === 'artist' ? 1 : 0.2},
            ]}
            onPress={() => setSortCriterion('name')}>
            <Text style={styles.sortItemText}>Track</Text>
          </Pressable>
          <Pressable
            style={[
              styles.sortItems,
              {
                opacity: sortCriterion === 'name' ? 1 : 0.2,
              },
            ]}
            onPress={() => setSortCriterion('artist')}>
            <Text style={styles.sortItemText}>Artist</Text>
          </Pressable>
        </View>
        <View style={styles.sortItemsGroup}>
          <Pressable
            style={[
              styles.sortItems,
              {
                opacity: !isSortAscending ? 1 : 0.2,
              },
            ]}
            onPress={() => setIsSortAscending(true)}>
            <Text style={styles.sortItemText}>
              {isSortAscending ? 'Sort Z-A' : 'Sort A-Z'}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.sortItems,
              {
                opacity: isSortAscending ? 1 : 0.2,
              },
            ]}
            onPress={() => setIsSortAscending(false)}>
            <Text style={styles.sortItemText}>
              {isSortAscending ? 'Sort Z-A' : 'Sort A-Z'}
            </Text>
          </Pressable>
        </View>
      </View>
      <TrackList data={filteredTracks} />
    </View>
  );
};

export default PlaylistDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    marginVertical: 5,
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  playlistTitle: {fontSize: 16, fontWeight: '700'},
  playlistDescription: {fontSize: 9},
  playlistArt: {borderRadius: 5, width: 200, height: 200},
  sortControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 3,
  },
  sortItems: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 60,
    padding: 3,
    marginBottom: 16,
    borderRadius: 5,
  },
  sortItemText: {textAlign: 'center'},
  sortItemsGroup: {display: 'flex', flexDirection: 'row', gap: 3},
});
