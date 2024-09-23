import {Pressable, StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React, {ReactNode, useContext} from 'react';
import {AppContext} from '../context';

const Button = ({
  title,
  children,
  variant,
  onPress,
  textStyle,
  containerStyle,
}: {
  title?: string;
  children?: ReactNode;
  variant: 'link' | 'contained';
  onPress: () => void;
  textStyle?: TextStyle | (TextStyle | undefined)[];
  containerStyle?: ViewStyle | (ViewStyle | undefined)[];
}) => {
  const {colors} = useContext(AppContext);

  const style = styles[variant];
  return (
    <Pressable
      style={({pressed}) => [
        styles.base,
        style,
        containerStyle,
        {backgroundColor: colors.backgorund},
        {opacity: pressed ? 0.2 : 1},
      ]}
      onPress={onPress}>
      {title && <Text style={[{color: colors.text}, textStyle]}> {title}</Text>}
      {children && children}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    margin: 1,
    padding: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  link: {
    borderWidth: 0,
  },
  contained: {
    borderWidth: 1,
  },
});
