import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { CountBadge, ImageCard, SelectPicker } from '../../UI';
import { Search } from '../search';
import { useAuthors, SortOptions, ALL_SORT_OPTIONS } from './hooks/useAuthors';
import { styles } from './styles';

export const Authors = () => {
  const {
    authors,
    totalCount,
    loading,
    page,
    limit,
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  } = useAuthors();

  const [allAuthors, setAllAuthors] = useState<typeof authors>([]);

  useEffect(() => {
    setAllAuthors([]);
  }, [sortBy]);

  useEffect(() => {
    if (authors.length > 0) {
      if (page === 1) {
        setAllAuthors(authors);
      } else {
        setAllAuthors(prev => [...prev, ...authors]);
      }
    }
  }, [authors, page]);

  const handleEndReached = () => {
    if (!loading && allAuthors.length < totalCount) {
      handlePagination(page + 1, limit);
    }
  };

  if (loading && page === 1) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <View style={styles.headers}>
        <Search />
        <SelectPicker
          value={sortBy}
          onChange={val => handleSortChange(val)}
          options={ALL_SORT_OPTIONS}
        />
      </View>

      <FlatList
        data={allAuthors}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <View>
            <ImageCard
              uri={item.portraitThumbnail}
              width={180}
              height={315}
              style={{ marginRight: 5, marginLeft: 10 }}
              id={item.id}
              handleClick={handleClickCard}
              title={`${item.surname}, ${item.name}`}
              titlePosition="bottom"
            />
            {sortBy === SortOptions.bookCount && 'count' in item && (
              <CountBadge count={(item as { count: number }).count} />
            )}
          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && page > 1 ? (
            <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 10 }} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};
