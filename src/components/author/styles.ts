import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.backgroundAccent, flex: 1, paddingTop: 20 },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundMain,
  },
});
