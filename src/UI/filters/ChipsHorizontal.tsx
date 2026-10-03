import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface Option {
  label: string;
  value: string | number;
}

interface ChipsHorizontalProps {
  value?: string | null;
  onChange: (val: string | number) => void;
  options: Option[];
}

export const ChipsHorizontal = ({ value, onChange, options }: ChipsHorizontalProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort By</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chipsWrapper}>
          {options.map(item => {
            const isActive = value === item.value;
            console.log(value, item.value);

            return (
              <TouchableOpacity
                key={item.value}
                style={[styles.chip, isActive && styles.chipActive]}
                onPress={() => {
                  if (item.value) onChange(item.value);
                }}
              >
                <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
