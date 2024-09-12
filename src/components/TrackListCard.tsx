import React from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {IArtist, IPlaylistTrackItem, ITrack} from '../types/types';

const TracklistCard: React.FC<{item: Partial<IPlaylistTrackItem>}> = ({
  item,
}) => {
  const {name: trackName, artists, album, external_urls} = item.track as ITrack;
  const artistNames = artists.map((artist: IArtist) => artist.name).join(', ');
  const albumArt = album.images[0]?.url;

  return (
    <View style={styles.trackItem}>
      <Image style={styles.albumArt} source={{uri: albumArt}} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackName}>{trackName}</Text>
        <Text style={styles.artistNames}>{artistNames}</Text>
        <Pressable
          onPress={async () => await Linking.openURL(external_urls?.spotify)}>
          <Text style={styles.preview}>Preview</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TracklistCard;

const styles = StyleSheet.create({
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  albumArt: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  trackInfo: {
    marginLeft: 12,
  },
  trackName: {
    fontWeight: 'bold',
  },
  artistNames: {
    color: '#666',
  },
  preview: {
    marginTop: 10,
    color: 'lightblue',
  },
});
