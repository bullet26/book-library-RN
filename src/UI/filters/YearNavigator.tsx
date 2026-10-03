import React from 'react';
import { View } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { SelectPicker } from './SelectPicker'; // Existing select component
import { styles } from './styles';

interface YearNavigatorProps {
  years: {
    count: number;
    period: string;
  }[];
  selectedYear?: string | null;
  onSelectYear: (year: string) => void;
  label?: string;
  divider?: boolean;
}

export const YearNavigator = ({
  years,
  selectedYear,
  onSelectYear,
  label,
  divider = true,
}: YearNavigatorProps) => {
  return (
    <View style={styles.sectionContainer}>
      {divider && <View style={styles.divider} />}
      <SelectPicker
        label={label}
        value={selectedYear || null}
        options={years.map(({ period }) => ({
          value: period,
          label: period,
        }))}
        placeholder="Jump directly to year..."
        onChange={onSelectYear}
        buttonStyle={styles.navigatorButton}
        leftIcon={<Calendar size={18} color="#9E339F" />}
      />
    </View>
  );
};
