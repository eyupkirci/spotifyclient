import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Linking} from 'react-native';
import useFetchData from '../hooks/useFetchData';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DynamicPlaylists from './DynamicFlatlist';
import SearchInput from './SearchInput';

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
      <SearchInput
        placeholder="Search for artists, playlist or tracks."
        placeholderTextColor="gray"
        value={query}
        onChangeText={setQuery}
        onClear={() => setQuery('')}
      />

      {query !== '' && data !== null && (
        <Text style={styles.resultTitle}>Results</Text>
      )}

      {query !== '' && data?.playlists?.href && (
        <View>
          <Text style={styles.resultSectionTitle}>
            {`Playlists: ${data?.playlists?.total}`}
          </Text>
          <DynamicPlaylists
            url={data?.playlists?.href}
            type="playlists"
            onPress={item => navigation.navigate('Details', {data: item})}
          />
        </View>
      )}
      {query !== '' && data?.tracks?.href && (
        <View>
          <Text style={styles.resultSectionTitle}>
            {`Tracks: ${data?.tracks?.total}`}
          </Text>
          <DynamicPlaylists
            url={data?.tracks?.href}
            type="tracks"
            onPress={item => Linking.openURL(item?.external_urls?.spotify)}
          />
        </View>
      )}
      {query !== '' && data?.artists?.href && (
        <View>
          <Text style={styles.resultSectionTitle}>
            {`Artists: ${data?.artists?.total}`}
          </Text>
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
  searchPressable: {
    position: 'absolute',
    top: 14,
    right: 10,
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
  searchClear: {color: 'navy', paddingTop: 2},
  searchItemText: {textAlign: 'center', fontSize: 10},
  resultTitle: {textAlign: 'center', fontWeight: 'bold', fontSize: 24},
  resultSectionTitle: {padding: 10, fontWeight: 'bold', fontSize: 14},
});

export default Search;
