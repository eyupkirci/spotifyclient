import React from 'react';
import {Pressable, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface SortChipButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SortChipButton: React.FC<SortChipButtonProps> = ({
  label,
  isActive,
  onPress,
  style,
  textStyle,
}) => {
  return (
    <Pressable
      style={[
        styles.sortChip,
        // eslint-disable-next-line react-native/no-inline-styles
        {borderColor: isActive ? 'black' : 'gray'},
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.sortChipText,
          // eslint-disable-next-line react-native/no-inline-styles
          {fontWeight: isActive ? 'bold' : '300'},
          textStyle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  sortChip: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 60,
    padding: 3,
    marginBottom: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortChipText: {
    textAlign: 'center',
    fontSize: 10,
  },
});

export default SortChipButton;
