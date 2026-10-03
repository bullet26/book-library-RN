import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { Filter, X } from 'lucide-react-native';
import { RatingFilter, SelectPicker, YearNavigator } from '../../UI';
import { bookSortByLabels, useFilters } from './hooks/useFilters';
import { styles } from './styles';
import { useBookDetail } from '../book/hook/useBook';

export const FilterDrawer = () => {
  const {
    selectedTag,
    selectedRating,
    selectedYear,
    sortBy,
    handleFilterChange,
    applyFilters: onApply,
    resetFilters: onReset,
    tags,
    years,
  } = useFilters();

  const { goToBooksByYear } = useBookDetail();

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <>
      <TouchableOpacity style={styles.triggerButton} onPress={onOpen} activeOpacity={0.8}>
        <Filter size={18} color="#ffffff" />
        <Text style={styles.triggerText}>Filters</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isOpen}
        onBackdropPress={onClose}
        onSwipeComplete={onClose}
        swipeDirection={['down']}
        style={styles.modal}
        propagateSwipe
      >
        <View style={styles.sheetContainer}>
          <View style={styles.dragHandle} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={onReset} style={styles.resetButton}>
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} hitSlop={8}>
                <X size={22} color="lightgray" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Body */}
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <SelectPicker
              value={sortBy}
              onChange={val => handleFilterChange('sortBy', val)}
              options={Object.entries(bookSortByLabels).map(([value, label]) => ({ value, label }))}
            />
            <RatingFilter
              value={selectedRating}
              onChange={val => handleFilterChange('rating', val)}
            />
            <SelectPicker
              value={selectedTag}
              onChange={val => handleFilterChange('tagId', val)}
              placeholder="Select a tag"
              options={tags.map(tag => ({ value: tag.id, label: tag.tag }))}
            />
            <SelectPicker
              value={selectedYear}
              options={years.map(({ period }) => ({
                value: period,
                label: period,
              }))}
              placeholder="Select a year"
              onChange={val => handleFilterChange('year', val)}
            />

            <YearNavigator years={years} onSelectYear={goToBooksByYear} label="Go to year" />
          </ScrollView>

          {/* Footer */}
          <SafeAreaView style={styles.footer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                onApply();
                onClose();
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
};
