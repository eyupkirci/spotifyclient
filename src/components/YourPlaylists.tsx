import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useFetchData from '../hooks/useFetchData';
import IsLoading from './IsLoading';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IPlaylist} from '../types/types';
import Card from './Card';

const mockUserId = 'taylorswift'; //todo: add auth mechanism to get userId

const YourPlaylists = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    data: yourPlaylist,
    isLoading: yourIsLoading,
    error: yourError,
  } = useFetchData(`https://api.spotify.com/v1/users/${mockUserId}/playlists`);

  if (yourIsLoading) {
    return <IsLoading />;
  }

  if (yourError) {
    return <Text>Error: {yourError}</Text>;
  }

  return (
    <View>
      <Text style={styles.playlistTitle}>Your Playlists</Text>
      <FlatList
        horizontal={true}
        data={yourPlaylist?.items}
        keyExtractor={(playlist: IPlaylist) => playlist?.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text>No playlist found.</Text>}
        renderItem={({item}: {item: IPlaylist}) => (
          <Card
            item={item}
            onPress={() => navigation.navigate('Details', {data: item})}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistTitle: {fontSize: 24, padding: 10, fontWeight: 'bold'},
});

export default YourPlaylists;
