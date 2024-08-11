import {ImageStyle, ViewStyle} from 'react-native';
import {Colors} from '../../constants';

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
      backgroundColor: Colors.white,
    } as ViewStyle,
  };
};
export default useStyles;
