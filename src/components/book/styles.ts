import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  wrapper: { backgroundColor: colors.backgroundAccent, flex: 1 },
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundMain,
  },
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    marginVertical: 20,
  },
  triggerText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundMain,
    marginVertical: 20,
  },
  videoWrapper: { flexDirection: 'row', columnGap: 15 },
  bookInfoWRapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginTop: 10,
  },

  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
    marginVertical: 8,
  },
  tag: {
    backgroundColor: '#fff0f6',
    borderColor: '#ffadd2',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tagText: {
    color: '#c41d7f',
    fontSize: 13,
    fontWeight: '500',
  },
});
