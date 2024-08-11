import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {FC} from 'react';
import useStyles from './NewsCard.Styles';
import {parseTime} from '../../config/date';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import DeleteIcon from '../../assets/Icons/DeleteIcon';
import PinIcon from '../../assets/Icons/PinIcon';
import {Colors} from '../../constants';

type NewsCardType = {
  item: any;
  isPinned?: boolean;
  isDeleted?: boolean;
  handlePin?: () => void;
  handleDelete?: () => void;
};
const NewsCard: FC<NewsCardType> = ({
  item,
  isDeleted,
  isPinned,
  handleDelete,
  handlePin,
}) => {
  const styles = useStyles();
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const offset = useSharedValue<number>(0);
  const MAX_SWIPE_WIDTH = -80;
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });
  if (isDeleted) return null;
  const pan = Gesture.Pan()
    .onBegin(() => {
      // pressed.value = true;
    })
    .onChange(event => {
      if (event.translationX >= MAX_SWIPE_WIDTH) {
        offset.value = event.translationX;
        translateX.value = offset.value;
      }
    })
    .onFinalize(event => {
      if (event.translationX < 0) {
        translateX.value = withSpring(-80);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const closeSwipe = () => {
    translateX.value = withSpring(0);
  };
  const handleDeleteAction = () => {
    translateX.value = withSpring(-width);
    setTimeout(() => {
      handleDelete && handleDelete();
    }, 500);
  };
  const handlePinAction = () => {
    if (isPinned) return;
    handlePin && handlePin();
    closeSwipe();
  };

  const renderSwipable = () => {
    return (
      <GestureDetector gesture={pan}>
        <View style={styles.gesture} />
      </GestureDetector>
    );
  };
  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.newsCard, animatedCardStyle]}>
        {isPinned && (
          <View style={styles.pinLabel}>
            <PinIcon color={Colors.gray} width={14} />
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
        <TouchableOpacity activeOpacity={0.75} onPress={handleDeleteAction}>
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
