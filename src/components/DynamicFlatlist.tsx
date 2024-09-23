import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import useFetchData from '../hooks/useFetchData';
import IsLoading from './IsLoading';
import Card from './Card';
import Button from './Button';
import {AppContext} from '../context';

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
  const {colors} = useContext(AppContext);
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
        ListEmptyComponent={<Text>{`No ${type} found.`}</Text>}
        renderItem={({item}) => (
          <Card item={item} onPress={() => onPress(item)} />
        )}
      />
      <View style={styles.nav}>
        <Button
          variant="contained"
          onPress={() =>
            setEndpoint(
              data?.[type]?.previous ?? (data?.[type]?.href as string),
            )
          }
          title="Previous"
          textStyle={{
            color: data?.[type]?.previous === null ? 'lightgray' : colors.text,
          }}
          containerStyle={{
            borderColor:
              data?.[type]?.previous === null ? 'lightgray' : colors.text,
          }}
        />
        <Button
          variant="contained"
          onPress={() =>
            setEndpoint(data?.[type]?.next ?? (data?.[type]?.href as string))
          }
          title="Next"
          textStyle={{
            color: data?.[type]?.next === null ? 'lightgray' : colors.text,
          }}
          containerStyle={{
            borderColor:
              data?.[type]?.next === null ? 'lightgray' : colors.text,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DynamicFlatlist;
