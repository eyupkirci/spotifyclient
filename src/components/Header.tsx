import React, {useContext} from 'react';
import {View, Text, Image, Alert, StyleSheet} from 'react-native';
import {AppContext} from '../context';
import Button from './Button';

const Header = () => {
  const {colors, user} = useContext(AppContext);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.headerText, {color: colors.text}]}>
            Listen your favourite music
          </Text>
        </View>
        <Button
          variant="link"
          containerStyle={styles.imagePressable}
          onPress={() => {
            Alert.alert(`Welcome ${user.user.username}`);
          }}>
          <Image
            style={styles.userImage}
            source={require('../assets/feather_user.png')}
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 3,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  imagePressable: {
    flex: 1,
    position: 'relative',
  },
  userImage: {
    position: 'absolute',
    top: 5,
    right: 5,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  ThemeButton: {
    alignSelf: 'flex-end',
  },
});

export default Header;
