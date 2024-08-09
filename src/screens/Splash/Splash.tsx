import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/RootStacks';

export type SplashScreenProps = {};
type SplashScreenType = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: FC<SplashScreenType> = () => {
  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
};

export default SplashScreen;
