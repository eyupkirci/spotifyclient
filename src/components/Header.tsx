import React from 'react';
import {View, Text, Pressable, Image, Alert, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Listen your favourite music</Text>
      </View>
      <Pressable
        onPress={() => {
          Alert.alert('Welcome User');
        }}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.2 : 1,
          },
          styles.imagePressable,
        ]}>
        <Image
          style={styles.userImage}
          source={require('../assets/feather_user.png')}
        />
      </Pressable>
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
  },
});

export default Header;
