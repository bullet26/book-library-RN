import { CSSProperties } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { colorRate } from '../../utils';
import { makeArray } from './utils';
import styles from './styles';

interface RatingProps {
  rating: number;
  type: 'star' | 'circle-only';
  style?: CSSProperties;
}

export const Rating = (props: RatingProps) => {
  const { rating, type, style } = props;

  return (
    <>
      {type === 'star' && (
        <SafeAreaView style={{ ...styles.wrapper, ...(style && { style }) }}>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <FlatList
              data={makeArray(rating)}
              horizontal={true}
              renderItem={() => (
                <View>
                  <FontAwesome6
                    name="star"
                    iconStyle="solid"
                    style={{ color: colorRate(rating) }}
                    size={40}
                  />
                </View>
              )}
              keyExtractor={index => index.toString()}
              ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
            />
            {!Number.isInteger(rating) && (
              <FontAwesome6
                name="star-half"
                iconStyle="solid"
                style={{ color: colorRate(rating) }}
                size={40}
              />
            )}
          </View>
          <View style={{ ...styles.ratingCircle, backgroundColor: colorRate(rating) }}>
            {!!rating ? (
              <Text style={styles.text}>{rating}</Text>
            ) : (
              <FontAwesome6 iconStyle="solid" name="check" size={40} />
            )}
          </View>
        </SafeAreaView>
      )}
      {type === 'circle-only' && (
        <View style={{ ...styles.circleOnly, backgroundColor: colorRate(rating) }}>
          {!!rating ? (
            <Text style={styles.circleOnlyText}>{rating}</Text>
          ) : (
            <FontAwesome6 iconStyle="solid" name="check" size={40} />
          )}
        </View>
      )}
    </>
  );
};
