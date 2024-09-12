import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import useFetchSpotifyData from '../hooks/useFetchStotifyData';
import {RootStackParamList} from '../App';
import {IPlaylist} from '../types/types';
import IsLoading from './IsLoading';
import PlaylistCard from './PlaylistCard';

const FeaturedPlaylists: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [endpoint, setEndpoint] = useState<string>(
    'https://api.spotify.com/v1/browse/featured-playlists',
  );

  const {data, error, isLoading} = useFetchSpotifyData(endpoint, {
    key: endpoint,
    refetch: false,
  });

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.component}>
      <Text style={styles.playlistTitle}>{data?.message}</Text>
      <FlatList
        horizontal={true}
        data={data?.playlists?.items}
        keyExtractor={(playlist: IPlaylist) => playlist.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: IPlaylist}) => (
          <PlaylistCard
            playlist={item}
            onPress={() => navigation.navigate('Details', {data: item})}
          />
        )}
      />
      <View style={styles.nav}>
        <Pressable
          onPress={() =>
            setEndpoint(
              data?.playlists?.previous ?? (data?.playlists?.href as string),
            )
          }>
          <Text style={{opacity: data?.playlists?.previous === null ? 0.2 : 1}}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          style={{opacity: data?.playlists?.next === null ? 0.2 : 1}}
          onPress={() =>
            setEndpoint(
              data?.playlists?.next ?? (data?.playlists?.href as string),
            )
          }>
          <Text>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {backgroundColor: 'lightblue', padding: 8},
  playlistTitle: {fontSize: 24, marginVertical: 10, fontWeight: 'bold'},
  nav: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
});

export default FeaturedPlaylists;
