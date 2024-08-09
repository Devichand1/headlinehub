import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/RootStacks';

export type HomeScreenProps = {};
type HomeScreenType = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: FC<HomeScreenType> = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
