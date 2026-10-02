import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { CountBadge, ImageCard } from '../../UI';
import { Search } from '../search';
import { useAuthors, SortOptions } from './hooks/useAuthors';

export const Authors = () => {
  const {
    authors,
    totalCount,
    loading,
    error,
    page,
    limit,
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  } = useAuthors();

  const [allAuthors, setAllAuthors] = useState<typeof authors>([]);

  console.log(error, 'Authors');

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

  const toggleSort = nextSort => {
    handleSortChange(nextSort);
  };

  const handleEndReached = () => {
    if (!loading && allAuthors.length < totalCount) {
      handlePagination(page + 1, limit);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <View style={styles.headers}>
        <Search />
        {/* <Button
          title={sortBy === SortOptions.surname ? 'Sort by: Last Name' : 'Sort by: Book Count'}
          color="#6c0e4b"
          onPress={e => toggleSort(e.target.v)}
        /> */}
      </View>

      {loading && page === 1 && (
        <View style={styles.centeredLoader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <FlatList
        data={allAuthors}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
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

const styles = StyleSheet.create({
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.backgroundMain,
  },
  cardContainer: {
    position: 'relative',
  },
  headers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    zIndex: 2,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  container: {
    backgroundColor: colors.backgroundMain,
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    color: colors.textWhite,
  },
});
