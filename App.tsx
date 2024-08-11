import React from 'react';

import NavigationWrapper from './src/navigations/NavigationContainer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import {Colors} from './src/constants';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <NavigationWrapper />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
