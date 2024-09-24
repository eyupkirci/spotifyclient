import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Card from './Card';

import {IPlaylist} from '../types/types';
import {RootStackParamList} from '../navigation/AppNavigation';
import {AppContext} from '../context';

const YourPlaylists = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {user, colors} = useContext(AppContext);

  return (
    <View>
      <Text style={[styles.playlistTitle, {color: colors.text}]}>
        Your Playlists
      </Text>
      <FlatList
        horizontal={true}
        data={user.user.playlist?.items}
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
