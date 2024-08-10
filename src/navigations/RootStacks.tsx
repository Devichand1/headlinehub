import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen, SplashScreenProps} from '../screens/Splash';
import {HomeScreen} from '../screens/Home';
import {screenOptions} from '../config/navigation';

export type RootStackParamList = {
  Splash: SplashScreenProps;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStacks = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStacks;
