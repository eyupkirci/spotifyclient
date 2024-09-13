import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useFetchData from '../hooks/useFetchData';
import IsLoading from './IsLoading';
import PlaylistCard from './PlaylistCard';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const ChosenPlaylists = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {
    data: playlist1,
    isLoading: isLoading1,
    error: error1,
  } = useFetchData(
    'https://api.spotify.com/v1/playlists/37i9dQZF1DWSBi5svWQ9Nk',
  );
  const {
    data: playlist2,
    isLoading: isLoading2,
    error: error2,
  } = useFetchData(
    'https://api.spotify.com/v1/playlists/37i9dQZF1DWZUozJiHy44Y',
  );
  const {
    data: playlist3,
    isLoading: isLoading3,
    error: error3,
  } = useFetchData(
    'https://api.spotify.com/v1/playlists/37i9dQZF1DXdaeKeYefGeI',
  );

  if (isLoading1 || isLoading2 || isLoading3) {
    return <IsLoading />;
  }

  if (error1 || error2 || error3) {
    return <Text>Error: {isLoading1 || isLoading2 || isLoading3}</Text>;
  }

  return (
    <View style={styles.component}>
      <Text style={styles.playlistTitle}>Chosen Playlists</Text>
      <View style={styles.playlistContainer}>
        <PlaylistCard
          imageStyle={styles.images}
          playlist={playlist1}
          onPress={() => navigation.navigate('Details', {data: playlist1})}
        />
        <PlaylistCard
          imageStyle={styles.images}
          playlist={playlist2}
          onPress={() => navigation.navigate('Details', {data: playlist2})}
        />
        <PlaylistCard
          imageStyle={styles.images}
          playlist={playlist3}
          onPress={() => navigation.navigate('Details', {data: playlist3})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {backgroundColor: 'lightblue', padding: 8},
  images: {width: 120, height: 120},
  playlistContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playlistTitle: {fontSize: 24, marginVertical: 10, fontWeight: 'bold'},
});

export default ChosenPlaylists;
