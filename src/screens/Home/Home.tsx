import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/RootStacks';
import useHomeScreen from '../../hooks/useHomeScreen';
import useStyles from './Home.Styles';
import {Images} from '../../constants';
import NewsCard from '../../components/NewCard/NewsCard';
import RefreshIcon from '../../assets/Icons/RefreshIcon';

type HomeScreenType = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: FC<HomeScreenType> = () => {
  const {
    data,
    fetchNextBatchManually,
    handleRemovePinned,
    pinnedNews,
    handleDelete,
    handlePin,
  } = useHomeScreen();
  const styles = useStyles();

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Image source={Images.logo} style={styles.headerLogo} />
        <TouchableOpacity activeOpacity={0.75} onPress={fetchNextBatchManually}>
          <RefreshIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        ListHeaderComponent={
          pinnedNews ? (
            <NewsCard
              isPinned={true}
              item={pinnedNews}
              handleDelete={handleRemovePinned}
            />
          ) : null
        }
        data={data}
        renderItem={({item}) => (
          <NewsCard
            handlePin={() => handlePin(item)}
            item={item}
            handleDelete={() => handleDelete(item)}
          />
        )}
        initialNumToRender={10}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </View>
  );
};

export default Home;
