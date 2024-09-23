import React from 'react';
import {ViewStyle, TextStyle} from 'react-native';
import Button from './Button';

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
    <Button
      variant="link"
      title={label}
      containerStyle={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderWidth: 1,
          width: 60,
          padding: 3,
          marginBottom: 16,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: isActive ? 'lightgray' : 'gray',
        },
        style,
      ]}
      textStyle={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          textAlign: 'center',
          fontSize: 10,
          fontWeight: isActive ? 'bold' : '300',
        },
        textStyle,
      ]}
      onPress={onPress}
    />
  );
};
export default SortChipButton;
