import {ImageStyle, ViewStyle} from 'react-native';

const useStyles = () => {
  return {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    logo: {
      width: 250,
      height: 200,
      resizeMode: 'contain',
    } as ImageStyle,
  };
};
export default useStyles;
