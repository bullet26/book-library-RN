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
      {<Text style={styles.circleText}>{count || 0}</Text>}
    </View>
  );
};
