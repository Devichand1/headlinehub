import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import useStyles from './NewsCard.Styles';
import {Swipeable} from '../Swipeable';
import {parseTime} from '../../config/date';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import DeleteIcon from '../../assets/Icons/DeleteIcon';
import PinIcon from '../../assets/Icons/PinIcon';

type NewsCardType = {
  item: any;
  isPinned?: boolean;
  handlePin?: (item: any) => void;
};
const NewsCard: FC<NewsCardType> = ({item, isPinned, handlePin}) => {
  const styles = useStyles();
  const translateX = useSharedValue(0);
  const offset = useSharedValue<number>(0);
  const MAX_SWIPE_WIDTH = -80;
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  const pan = Gesture.Pan()
    .onBegin(() => {
      // pressed.value = true;
    })
    .onChange(event => {
      if (event.translationX < 0 && event.translationX >= MAX_SWIPE_WIDTH) {
        offset.value = event.translationX;
        translateX.value = offset.value;
      }
    })
    .onFinalize(() => {
      translateX.value = withSpring(-80);
    });

  const closeSwipe = () => {
    translateX.value = withSpring(0);
  };
  const handleDelete = () => {
    console.log('Delete');
    closeSwipe();
  };
  const handlePinAction = () => {
    if (isPinned) return;
    handlePin(item);
    closeSwipe();
  };

  const renderSwipable = () => {
    return (
      <GestureDetector gesture={pan}>
        <View
          style={{
            width: 100,
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1,
            bottom: 0,
          }}
        />
      </GestureDetector>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.newsCard, animatedCardStyle]}>
        {isPinned && (
          <View style={styles.pinLabel}>
            <PinIcon color={'#444444'} width={14} />
            <Text>Pinned on Top</Text>
          </View>
        )}
        <View style={styles.cardHeader}>
          <Text>{item.source.name}</Text>
          <Text>{parseTime(item.publishedAt)}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.headLine}>{item.title}</Text>
          {item.urlToImage && (
            <Image source={{uri: item.urlToImage}} style={styles.image} />
          )}
        </View>
        <Text>{item.author}</Text>
        {renderSwipable()}
      </Animated.View>
      <View style={styles.cardAction}>
        <TouchableOpacity activeOpacity={0.75} onPress={handleDelete}>
          <DeleteIcon />
        </TouchableOpacity>
        <Text style={styles.actionTitle}>Delete</Text>
        <TouchableOpacity activeOpacity={0.75} onPress={handlePinAction}>
          <PinIcon />
        </TouchableOpacity>
        <Text style={styles.actionTitle}>Pin</Text>
      </View>
    </View>
  );
};

export default NewsCard;
