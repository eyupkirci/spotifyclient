import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import SortChipButton from './SortChipButton';

interface SortControlsProps {
  sortCriterion: 'name' | 'artist';
  isSortAscending: boolean;
  onSortCriterionChange: (criterion: 'name' | 'artist') => void;
  onSortOrderChange: (isAscending: boolean) => void;
  containerStyle?: ViewStyle;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortCriterion,
  isSortAscending,
  onSortCriterionChange,
  onSortOrderChange,
  containerStyle,
}) => {
  return (
    <View style={[styles.sortControls, containerStyle]}>
      <SortChipButton
        label="Track"
        isActive={sortCriterion === 'name'}
        onPress={() => onSortCriterionChange('name')}
      />
      <SortChipButton
        label="Artist"
        isActive={sortCriterion === 'artist'}
        onPress={() => onSortCriterionChange('artist')}
      />
      <SortChipButton
        label="Sort A-Z"
        isActive={isSortAscending}
        onPress={() => onSortOrderChange(true)}
      />
      <SortChipButton
        label="Sort Z-A"
        isActive={!isSortAscending}
        onPress={() => onSortOrderChange(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sortControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
});

export default SortControls;
