import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlaylistScreen from '../pages/PlaylistScreen';
import PlaylistDetailsScreen from '../pages/PlaylistDetailsScreen';
import useFetchData from '../hooks/useFetchData';
import IsLoading from '../components/IsLoading';
import {Text} from 'react-native';
import {AppContext} from '../context';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: any};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  const {setUser, user} = useContext(AppContext);

  const {data, error, isLoading} = useFetchData(
    `https://api.spotify.com/v1/users/${user?.user?.userId}/playlists`,
  );

  useEffect(() => {
    setUser({
      ...user,
      user: {...user.user, playlist: data},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

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
