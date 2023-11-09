import { FC } from 'react';
import { View } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { colorRate, makeArray } from './utils';
import styles from './styles';
import { FlatList, SafeAreaView, Text } from 'react-native';

interface RatingProps {
  rating: number;
}

const Rating: FC<RatingProps> = (props) => {
  const { rating } = props;

  return (
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
        {<Text style={styles.text}>{rating}</Text> || <Icon name="plus" color="white" size={40} />}
      </View>
    </SafeAreaView>
  );
};

export default Rating;
