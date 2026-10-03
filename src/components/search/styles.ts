import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: { zIndex: 5 },
  input: {
    color: colors.textWhite,
    width: 240,
  },
  resultList: {
    position: 'absolute',
    top: 45,
    backgroundColor: colors.dark,
    zIndex: 5,
    width: 240,
  },
  text: { fontSize: 18, color: colors.textMain },
});
