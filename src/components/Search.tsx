import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';
import useFetchData from '../hooks/useFetchData';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import DynamicPlaylists from './DynamicFlatlist';

const Search = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState<string>('');

  const {data} = useFetchData(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query.toLowerCase(),
    )}&type=playlist%2Cartist%2Ctrack`,
  );

  useEffect(() => {}, [query]);

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for artists, playlist or tracks."
          placeholderTextColor="gray"
          value={query}
          onChangeText={setQuery}
        />
        <Pressable
          style={styles.searchIconPressable}
          onPress={() => console.log('handle search')}>
          <Image source={require('../assets/feather_search.png')} />
        </Pressable>
      </View>

      {query !== '' && data?.playlists?.href && (
        <View>
          <Text style={{}}> {data?.playlists?.total} Playlists</Text>
          <DynamicPlaylists
            url={data?.playlists?.href}
            type="playlists"
            onPress={item => navigation.navigate('Details', {data: item})}
          />
        </View>
      )}
      {query !== '' && data?.tracks?.href && (
        <View>
          <Text> {data?.tracks?.total} Tracks</Text>
          <DynamicPlaylists
            url={data?.tracks?.href}
            type="tracks"
            onPress={item => Linking.openURL(item?.external_urls?.spotify)}
          />
        </View>
      )}
      {query !== '' && data?.artists?.href && (
        <View>
          <Text> {data?.artists?.total} Artists</Text>
          <DynamicPlaylists
            url={data?.artists?.href}
            type="artists"
            onPress={item => Linking.openURL(item?.external_urls?.spotify)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignSelf: 'center',
    width: '96%',
    margin: 10,
  },
  input: {
    marginVertical: 5,
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  searchIconPressable: {
    position: 'absolute',
    top: 12,
    right: 10,
    opacity: 0.6,
  },
  searchControls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 3,
  },
  searchItems: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 60,
    padding: 3,
    borderRadius: 5,
  },
  searchItemText: {textAlign: 'center', fontSize: 10},
});

export default Search;
