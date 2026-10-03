import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface RatingProps {
  value?: string | null;
  onChange: (val: string | null) => void;
}

const OPTIONS = [
  { label: 'All', value: 'ALL' },
  { label: '★ 5', value: '5' },
  { label: '★ 4', value: '4' },
  { label: '★ 3', value: '3' },
  { label: '★ 2', value: '2' },
  { label: '★ 1', value: '1' },
];

export const RatingFilter = ({ value, onChange }: RatingProps) => {
  const currentValue = value || 'ALL';

  return (
    <View style={styles.container}>
      <View style={styles.segmentWrapper}>
        {OPTIONS.map(opt => {
          const isActive = currentValue === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              style={[styles.segmentItem, isActive && styles.segmentActive]}
              onPress={() => onChange(opt.value === 'ALL' ? null : opt.value)}
            >
              <Text style={[styles.segmentText, isActive && styles.textActive]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
