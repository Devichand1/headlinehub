import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

const useStyles = () => {
  return {
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      justifyContent: 'space-between',
      borderBlockColor: 'lightgray',
      borderBottomWidth: 1,
    } as ViewStyle,
    headerLogo: {
      height: 70,
      width: 130,
      resizeMode: 'contain',
    } as ImageStyle,
    container: {
      backgroundColor: '#fff',
    } as ViewStyle,
  };
};
export default useStyles;
