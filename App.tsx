import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/context/theme';
import AppNavigation from './src/navigation/AppNavigation';

function App(): React.JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1, marginTop: 60}}>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
