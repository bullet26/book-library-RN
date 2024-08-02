import { CSSProperties, FC } from 'react';
import { FlatList, SafeAreaView, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { colorRate, makeArray } from './utils';
import styles from './styles';

interface RatingProps {
  rating: number;
  type: 'star' | 'circle-only';
  style?: CSSProperties;
}

const Rating: FC<RatingProps> = (props) => {
  const { rating, type, style } = props;

  return (
    <>
      {type === 'star' && (
        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={makeArray(rating)}
            horizontal={true}
            renderItem={() => (
              <View>
                <Icon name="star" color={colorRate(rating)} size={40} />
              </View>
            )}
            keyExtractor={(index) => index.toString()}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          />

          <View style={{ ...styles.ratingCircle, backgroundColor: colorRate(rating) }}>
            {!!rating ? (
              <Text style={styles.text}>{rating}</Text>
            ) : (
              <FontAwesome6 name={'check'} size={40} />
            )}
          </View>
        </SafeAreaView>
      )}
      {type === 'circle-only' && (
        <View style={{ ...styles.circleOnly, backgroundColor: colorRate(rating) }}>
          {!!rating ? (
            <Text style={styles.circleOnlyText}>{rating}</Text>
          ) : (
            <FontAwesome6 name={'check'} size={40} />
          )}
        </View>
      )}
    </>
  );
};

export default Rating;
