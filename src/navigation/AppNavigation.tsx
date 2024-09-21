import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlaylistScreen from '../pages/PlaylistScreen';
import PlaylistDetailsScreen from '../pages/PlaylistDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={PlaylistScreen} />
        <Stack.Screen name="Details" component={PlaylistDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
