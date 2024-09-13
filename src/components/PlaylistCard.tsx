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

const CardImage = ({
  playlist,
  imageStyle,
}: {
  playlist: IPlaylist;
  imageStyle: ImageProps;
}) => {
  if (playlist?.images) {
    return (
      <Image
        style={[styles.cardImage, imageStyle]}
        source={{
          uri: playlist?.images[0]?.url,
        }}
      />
    );
  } else {
    return (
      <Image
        style={[styles.cardImage, imageStyle]}
        source={require('../assets/song_cover_placeholder.png')}
      />
    );
  }
};
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
        <CardImage playlist={playlist} imageStyle={imageStyle as ImageProps} />
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{playlist?.name}</Text>
          <Text style={styles.total}>
            {playlist?.tracks.total}
            {playlist?.tracks.total === 1 ? ' song' : ' songs'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 3,
    height: 220,
  },
  card: {},
  cardInfo: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardImage: {
    borderRadius: 4,
    width: 160,
    height: 160,
  },
  name: {
    width: 160,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  total: {fontSize: 10, textAlign: 'center'},
});

export default PlaylistCard;
