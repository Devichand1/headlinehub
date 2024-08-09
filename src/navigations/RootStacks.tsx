import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen, SplashScreenProps} from '../screens/Splash';
import {HomeScreen, HomeScreenProps} from '../screens/Home';

export type RootStackParamList = {
  Splash: SplashScreenProps;
  Home: HomeScreenProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default RootStacks;
