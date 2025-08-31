import { View, Text } from 'react-native';

import { getCountColor } from './utils';
import styles from './styles';

interface CountBadgeProps {
  count: number;
}

export const CountBadge = (props: CountBadgeProps) => {
  const { count } = props;

  return (
    <View style={{ ...styles.circle, backgroundColor: getCountColor(count) }}>
      {!!count && <Text style={styles.circleText}>{count}</Text>}
    </View>
  );
};
