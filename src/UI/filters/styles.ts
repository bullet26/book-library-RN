import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 8,
  },
  segmentWrapper: {
    flexDirection: 'row',
    backgroundColor: '#121214',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#2d2d32',
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  textActive: {
    color: '#ffffff',
    fontWeight: '700',
  },

  chipsWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#121214',
    borderWidth: 1,
    borderColor: '#2d2d32',
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: 'rgb(112, 10, 118)',
  },
  chipText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },

  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121214',
    borderWidth: 1,
    borderColor: '#2d2d32',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 15,
    color: '#ffffff',
  },
  placeholderText: {
    color: '#6b7280',
  },
  modalContent: {
    backgroundColor: '#1f1f22',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '60%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d32',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d32',
  },
  optionSelected: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 15,
    color: '#e5e7eb',
  },
  optionTextSelected: {
    fontWeight: '600',
  },

  sectionContainer: {
    gap: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2d2d32',
    width: '100%',
  },
  navigatorButton: {
    backgroundColor: '#121214',
    borderWidth: 1,
    borderColor: '#9333ea',
    borderRadius: 10,
  },
  navIconWrapper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
