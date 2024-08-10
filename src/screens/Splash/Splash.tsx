import {View, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/RootStacks';
import useStyles from './Splash.Styles';
import {Images} from '../../constants';

type SplashScreenType = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: FC<SplashScreenType> = props => {
  const {navigation} = props;
  const styles = useStyles();

  const navigateToHome = () => {
    navigation.replace('Home');
  };
  useEffect(() => {
    const input = setTimeout(navigateToHome, 2000);
    return () => clearTimeout(input);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Images.logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;
