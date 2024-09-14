import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import useFetchData from '../hooks/useFetchData';
import IsLoading from './IsLoading';
import Card from './Card';

/**
 * @param url string;
 * @param type: string;
 * @param onPress: (item: any) => void;
 * @returns Flatlist with navigation
 */

interface IDynamicPlaylists {
  url: string;
  type: string;
  onPress: (item: any) => void;
}

const DynamicFlatlist: React.FC<IDynamicPlaylists> = ({
  url,
  type,
  onPress,
}: IDynamicPlaylists) => {
  const [endpoint, setEndpoint] = useState<string>(url);

  const {data, error, isLoading} = useFetchData(endpoint);

  useEffect(() => {
    setEndpoint(url);
  }, [url]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <FlatList
        horizontal={true}
        data={data?.[type]?.items}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Card item={item} onPress={() => onPress(item)} />
        )}
      />
      <View style={styles.nav}>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
          onPress={() =>
            setEndpoint(
              data?.[type]?.previous ?? (data?.[type]?.href as string),
            )
          }>
          <Text
            style={[
              styles.navItem,
              {opacity: data?.[type]?.previous === null ? 0.2 : 1},
            ]}>
            Previous
          </Text>
        </Pressable>
        <Pressable
          style={({pressed}) => [
            {
              opacity: pressed ? 0.2 : 1,
            },
          ]}
          onPress={() =>
            setEndpoint(data?.[type]?.next ?? (data?.[type]?.href as string))
          }>
          <Text
            style={[
              styles.navItem,
              {opacity: data?.[type]?.next === null ? 0.2 : 1},
            ]}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItem: {color: 'navy'},
});

export default DynamicFlatlist;
