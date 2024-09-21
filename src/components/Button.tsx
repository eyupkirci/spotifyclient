import {Pressable, StyleSheet, Text} from 'react-native';
import React, {ReactNode, useContext} from 'react';
import {ThemeContext} from '../context/theme';

const Button = ({
  title,
  children,
  variant,
  onPress,
}: {
  title?: string;
  children?: ReactNode;
  variant: 'link' | 'contained';
  onPress: () => void;
}) => {
  const {colors} = useContext(ThemeContext);

  const style = styles[variant];
  return (
    <Pressable
      style={pressed => [
        styles.base,
        {backgroundColor: colors.backgorund},
        style,
        {opacity: pressed ? 1 : 0.2},
      ]}
      onPress={onPress}>
      {title && <Text style={{color: colors.text}}> {title}</Text>}
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
  },
  link: {
    borderWidth: 0,
  },
  contained: {
    borderWidth: 1,
  },
});
