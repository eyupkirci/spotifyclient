import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppProvider} from './src/context';
import AppNavigation from './src/navigation/AppNavigation';

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1, marginTop: 60}}>
      <AppProvider>
        <AppNavigation />
      </AppProvider>
    </SafeAreaView>
  );
}

export default App;
