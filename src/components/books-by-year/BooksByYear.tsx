import { ActivityIndicator, FlatList, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBooksByYear } from './hooks/useBooksByYear';
import { colors } from '../../theme';
import { ImageCard, Rating, YearNavigator } from '../../UI';
import { styles } from './style';

export const BooksByYear = () => {
  const { books, year, loading, handleClickCard, years, setYear } = useBooksByYear();

  const sections = books.map(group => ({
    title: group.month,
    data: [group.books],
  }));

  if (loading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!books.length && !!year)
    return (
      <View>
        <YearNavigator years={years} onSelectYear={setYear} selectedYear={year} divider={false} />
      </View>
    );

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <YearNavigator years={years} onSelectYear={setYear} selectedYear={year} divider={false} />
      (
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: booksList }) => (
          <FlatList
            data={booksList}
            numColumns={3}
            horizontal={false}
            columnWrapperStyle={{ marginVertical: 12, marginLeft: 20 }}
            renderItem={({ item: book }) => (
              <View>
                <ImageCard
                  uri={book.bookCoverThumbnail}
                  width={100}
                  height={162}
                  style={{ marginRight: 5, marginLeft: 10 }}
                  id={book.id}
                  handleClick={() => handleClickCard(book.id)}
                  title={book.title}
                />
                <Rating rating={book.rating || 0} type="circle-only" />
              </View>
            )}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[
              styles.title,
              { backgroundColor: colors.lighterBGC, color: colors.fontDividerColor },
            ]}
          >
            &nbsp;&nbsp;{title}&nbsp;&nbsp;
          </Text>
        )}
        ListHeaderComponent={() => (year ? <Text style={styles.mainTitle}>{year}</Text> : null)}
      />
      )
    </SafeAreaView>
  );
};
