import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
const useStyles = () => {
  return {
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    newsCard: {
      padding: 16,
      flex: 1,
      backgroundColor: '#fff',
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
    } as ViewStyle,
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    } as ViewStyle,
    cardBody: {
      flexDirection: 'row',
      gap: 8,
      marginVertical: 8,
    } as ViewStyle,
    image: {
      width: 100,
      height: 100,
      borderRadius: 12,
    } as ImageStyle,
    headLine: {
      fontSize: 18,
      flex: 1,
      fontWeight: 'bold',
      color: 'black',
    } as TextStyle,
    cardAction: {
      position: 'absolute',
      right: 0,
      backgroundColor: '#4BBDFC',
      height: 'auto',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 20,
      paddingHorizontal: 16,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      zIndex: -1,
    } as ViewStyle,
    actionTitle: {
      color: '#fff',
      marginBottom: 8,
      fontSize: 12,
    } as TextStyle,
    pinLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 8,
    } as ViewStyle,
  };
};
export default useStyles;
