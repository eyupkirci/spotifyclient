import React from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

interface BackButtonProps {
  onPress?: (event?: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
}

const BackButton: React.FC<BackButtonProps> = ({onPress, style}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.2 : 1,
        },
        styles.backButton,
        style,
      ]}>
      <Image source={require('../assets/feather_chevron-left.png')} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
});

export default BackButton;
