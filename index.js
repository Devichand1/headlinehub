import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BackgroundFetch from 'react-native-background-fetch';
import {bgTask} from './BgTask';

AppRegistry.registerComponent(appName, () => App);
const initBackgroundFetch = async () => {
    console.log('calling headless task');
  await BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async taskId => {
      try {
        await bgTask();
      } catch (error) {
        console.error('[BackgroundFetch] error:', error);
      }
      BackgroundFetch.finish(taskId);
    },
    taskId => {
      BackgroundFetch.finish(taskId);
    },
  );
};
BackgroundFetch.scheduleTask({
  taskId: 'fetchBgTask',
  delay: 0,
  forceAlarmManager: true,
  periodic: false,
  enableHeadless: true,
});
initBackgroundFetch();
