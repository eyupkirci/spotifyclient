import React from 'react';
import {Pressable, StyleSheet, Image, Text, View} from 'react-native';
import {IPlaylist} from '../types/types';

interface IPlaylistCard {
  playlist: IPlaylist;
  onPress: () => void;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({playlist, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          width={160}
          height={160}
          source={{
            uri: playlist.images[0].url,
          }}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{playlist.name}</Text>
          <Text style={styles.total}>{playlist.tracks.total} songs</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {padding: 10},
  card: {},
  cardInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  total: {fontSize: 10},
});

export default PlaylistCard;
