import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStacks from './RootStacks';

const NavigationWrapper: FC = () => {
  return (
    <NavigationContainer>
      <RootStacks />
    </NavigationContainer>
  );
};
export default NavigationWrapper;
