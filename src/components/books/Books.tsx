import { useEffect, useState } from 'react';
import { ActivityIndicator, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBooks } from './hooks/useBooks';
import { ImageCard, Rating } from '../../UI';
import { colors } from '../../theme';
import { Search } from '../search';
import { styles } from './styles';
import { FilterDrawer } from './Filter';
import { BookOpen } from 'lucide-react-native';
import { useFilters } from './hooks/useFilters';

export const Books = () => {
  const { books, loading, page, limit, totalCount, handleClickCard, handlePagination } = useBooks();
  const { resetFilters } = useFilters();

  const [allBooks, setAllBooks] = useState<typeof books>([]);

  useEffect(() => {
    if (books.length > 0) {
      if (page === 1) {
        setAllBooks(books);
      } else {
        setAllBooks(prev => [...prev, ...books]);
      }
    }
  }, [books, page]);

  const handleEndReached = () => {
    if (!loading && books.length < totalCount) {
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

  if (!books.length && page === 1 && !loading) {
    return (
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <View style={styles.headers}>
          <Search />
          <FilterDrawer />
        </View>
        <View style={styles.emptyBookContainer}>
          <View style={styles.iconContainer}>
            <BookOpen size={64} color="#6B7280" strokeWidth={1.5} />
          </View>

          <Text style={styles.emptyBookTitle}>No books found</Text>

          <Text style={styles.description}>
            Either your criteria are too high, or you haven't read anything matching this yet
          </Text>

          <TouchableOpacity style={styles.button} onPress={resetFilters} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Reset filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <View style={styles.headers}>
        <Search />
        <FilterDrawer />
      </View>
      <FlatList
        data={allBooks}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <View>
            <ImageCard
              uri={item.bookCoverThumbnail}
              width={180}
              height={315}
              style={{ marginRight: 5, marginLeft: 10 }}
              id={item.id}
              handleClick={() => handleClickCard(item.id)}
              title={item.title}
            />
            <Rating rating={item.rating || 0} type="circle-only" />
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
