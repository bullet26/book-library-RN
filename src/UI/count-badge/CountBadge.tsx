import { FC } from 'react';
import { View, Text } from 'react-native';

import { getCountColor } from './utils';
import styles from './styles';

interface CountBadgeProps {
  count: number;
}

const CountBadge: FC<CountBadgeProps> = (props) => {
  const { count } = props;

  return (
    <View style={{ ...styles.circle, backgroundColor: getCountColor(count) }}>
      {!!count && <Text style={styles.circleText}>{count}</Text>}
    </View>
  );
};

export default CountBadge;
