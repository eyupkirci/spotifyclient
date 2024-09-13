import React from 'react';
import {
  Pressable,
  StyleSheet,
  Image,
  Text,
  View,
  ViewProps,
  ImageProps,
} from 'react-native';
import {IPlaylist} from '../types/types';

interface IPlaylistCard {
  playlist: any;
  onPress: () => void;
  style?: ViewProps;
  imageStyle?: ImageProps;
}

const PlaylistCard: React.FC<IPlaylistCard> = ({
  playlist,
  onPress,
  style,
  imageStyle,
}) => {
  return (
    <Pressable onPress={onPress} style={[styles.cardContainer, style]}>
      <View style={styles.card}>
        <Image
          style={[styles.cardImage, imageStyle]}
          source={{
            uri: playlist?.images[0]?.url,
          }}
        />
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{playlist?.name}</Text>
          <Text style={styles.total}>{playlist?.tracks.total} songs</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {padding: 3},
  card: {},
  cardInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: 4,
    width: 160,
    height: 160,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  total: {fontSize: 10},
});

export default PlaylistCard;
