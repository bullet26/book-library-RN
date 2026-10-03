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
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
  },
  triggerText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sheetContainer: {
    backgroundColor: colors.backgroundMain,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
    paddingBottom: 16,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textMain,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  resetButton: {
    paddingVertical: 4,
  },
  resetText: {
    color: colors.textAccent,
    fontWeight: '500',
    fontSize: 14,
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  emptyBookContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: colors.backgroundMain,
  },
  iconContainer: {
    marginBottom: 16,
    opacity: 0.8,
  },
  emptyBookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
