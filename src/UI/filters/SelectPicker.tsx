import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, ViewStyle, StyleProp } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, X, Check } from 'lucide-react-native';
import { styles } from './styles';

interface Option {
  label: string;
  value: string;
}

interface SelectPickerProps {
  label?: string;
  value?: string | null;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
}

export const SelectPicker = ({
  label,
  value,
  options,
  placeholder = 'Select option',
  onChange,
  buttonStyle,
  leftIcon,
}: SelectPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      {/* Trigger Button */}
      <TouchableOpacity
        style={[styles.selectButton, buttonStyle]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.navIconWrapper}>
          {leftIcon}
          <Text style={[styles.selectText, !selectedOption && styles.placeholderText]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>
        <ChevronDown size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} hitSlop={8}>
                <X size={22} color="#111827" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[styles.optionItem, isSelected && styles.optionSelected]}
                    onPress={() => {
                      onChange(item.value);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {item.label}
                    </Text>
                    {isSelected && <Check size={18} color="#f5c5e1" />}
                  </TouchableOpacity>
                );
              }}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};
