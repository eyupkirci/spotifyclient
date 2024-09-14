import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlaylistScreen from './pages/PlaylistScreen';
import PlaylistDetailsScreen from './pages/PlaylistDetailsScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1, marginTop: 60}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={PlaylistScreen} />
          <Stack.Screen name="Details" component={PlaylistDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
