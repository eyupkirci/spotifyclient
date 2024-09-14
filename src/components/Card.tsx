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

export const CardImage = ({
  item,
  imageStyle,
}: {
  item: any;
  imageStyle: ImageProps;
}) => {
  if (item?.images?.length > 0) {
    return (
      <Image
        style={[styles.cardImage, imageStyle]}
        source={{
          uri: item?.images[0]?.url,
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
interface ICard {
  item: any;
  onPress: () => void;
  style?: ViewProps;
  imageStyle?: ImageProps;
}

const Card: React.FC<ICard> = ({item, onPress, style, imageStyle}) => {
  return (
    <Pressable onPress={onPress} style={[styles.cardContainer, style]}>
      <CardImage item={item} imageStyle={imageStyle as ImageProps} />
      <View style={styles.cardInfo}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.name}
        </Text>
        {item?.tracks?.total > 0 && (
          <Text style={styles.total}>
            {item?.tracks?.total}
            {item?.tracks?.total === 1 ? ' song' : ' songs'}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 3,
  },
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

export default Card;
