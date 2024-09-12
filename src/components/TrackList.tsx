import React from 'react';
import {FlatList, Text} from 'react-native';
import {IPlaylistTrackItem} from '../types/types';
import TracklistCard from './TrackListCard';

const TrackList: React.FC<{data: Partial<IPlaylistTrackItem>[]}> = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: Partial<IPlaylistTrackItem>, index: number) =>
        `${item?.track?.id}-${index}`
      }
      renderItem={({item}: {item: Partial<IPlaylistTrackItem>}) => (
        <TracklistCard item={item} />
      )}
      ListEmptyComponent={<Text>No tracks found</Text>}
    />
  );
};

export default TrackList;
