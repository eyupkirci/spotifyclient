import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useFetchSpotifyData from '../hooks/useFetchStotifyData';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {IArtist, IPlaylistTrackItem} from '../types/types';
import IsLoading from '../components/IsLoading';
import TrackList from '../components/TrackList';

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
  } = useFetchSpotifyData(playlist.tracks.href);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTracks, setFilteredTracks] = useState<IPlaylistTrackItem[]>(
    [],
  );

  useEffect(() => {
    if (playlistTracks) {
      const query = searchQuery.toLowerCase();
      const tracks = playlistTracks.items.filter((item: IPlaylistTrackItem) => {
        const trackName = item.track.name.toLowerCase();
        const artistNames = item.track.artists
          .map((artist: IArtist) => artist.name.toLowerCase())
          .join(' ');
        return trackName.includes(query) || artistNames.includes(query);
      });
      setFilteredTracks(tracks);
    }
  }, [searchQuery, playlistTracks]);

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
      <Text style={styles.playlistTitle}>{playlist.name}</Text>
      <Text style={styles.playlistDescription}>{playlist.description}</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search tracks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
    marginVertical: 16,
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
});
