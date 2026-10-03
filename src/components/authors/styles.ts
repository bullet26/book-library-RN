import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: colors.backgroundMain },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundMain,
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
});
