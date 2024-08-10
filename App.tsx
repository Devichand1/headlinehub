import React, {useEffect} from 'react';

import NavigationWrapper from './src/navigations/NavigationContainer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import BackgroundFetch from 'react-native-background-fetch';
import {bgTask} from './BgTask';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  useEffect(() => {
    const initBackgroundFetch = async () => {
      await BackgroundFetch.configure(
        {
          minimumFetchInterval: 15,
        },
        async (taskId: string) => {
          try {
            await bgTask();
          } catch (error) {
            console.error('[BackgroundFetch] error:', error);
          }
          BackgroundFetch.finish(taskId);
        },
        (taskId: string) => {
          BackgroundFetch.finish(taskId);
        },
      );
    };
    BackgroundFetch.scheduleTask({
      taskId: 'fetchBgTask',
      delay: 0,
      forceAlarmManager: true,
      periodic: false,
    });
    initBackgroundFetch();
    return () => {
      BackgroundFetch.stop();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
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
