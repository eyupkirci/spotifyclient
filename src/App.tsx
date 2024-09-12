import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlaylistScreen from './pages/PlaylistScreen';
import PlaylistDetailsScreen from './pages/PlaylistDetailsScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={PlaylistScreen}
            options={{title: 'Playlists'}}
          />
          <Stack.Screen
            name="Details"
            component={PlaylistDetailsScreen}
            options={{title: 'Playlist Details'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
