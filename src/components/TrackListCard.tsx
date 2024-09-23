import React, {useContext} from 'react';
import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import {IArtist, IPlaylistTrackItem, ITrack} from '../types/types';
import {AppContext} from '../context';
import Button from './Button';

const TracklistCard: React.FC<{item: Partial<IPlaylistTrackItem>}> = ({
  item,
}) => {
  const {name: trackName, artists, album, external_urls} = item.track as ITrack;
  const artistNames = artists.map((artist: IArtist) => artist.name).join(', ');
  const albumArt = album.images[0]?.url;
  const {colors} = useContext(AppContext);

  return (
    <View style={styles.trackItem}>
      <Image style={styles.albumArt} source={{uri: albumArt}} />
      <View style={styles.trackInfo}>
        <Text style={[styles.trackName, {color: colors.text}]}>
          {trackName}
        </Text>
        <Text style={[styles.artistNames, {color: colors.text}]}>
          {artistNames}
        </Text>
        <Button
          textStyle={styles.preview}
          variant="link"
          title="Preview"
          onPress={async () => await Linking.openURL(external_urls?.spotify)}
        />
      </View>
    </View>
  );
};

export default TracklistCard;

const styles = StyleSheet.create({
  trackItem: {
    width: 340,
    flexDirection: 'row',
    overflow: 'hidden',
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
    fontSize: 9,
  },
});
