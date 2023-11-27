import { FC, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS_BY_SPECIFIC_DATE } from '../../graphQL';
import { ActivityIndicator, SafeAreaView, SectionList, FlatList, Text } from 'react-native';
import { ImageCard } from '../../UI';
import { ReadDateBook } from 'types';
import { BooksByDateProps, FormattedBook, BooksByDateQuery } from './type';
import { themeContext } from '../../theme';
import { styles } from './style';

const BooksByDate: FC<BooksByDateProps> = ({ route, navigation }) => {
  const { year } = route?.params;

  const { loading, error, data } = useQuery<BooksByDateQuery>(ALL_BOOKS_BY_SPECIFIC_DATE, {
    variables: {
      year: Number(year),
    },
  });

  const colors = useContext(themeContext);

  const [formattedBooks, setFormattedBooksState] = useState<FormattedBook>([]);

  const handleClickBook = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  useEffect(() => {
    if (data?.bookInYear?.length) {
      const booksData = data?.bookInYear;
      let currentMonth = booksData[0].readEnd.month;
      let arr: ReadDateBook[] = [];
      const result: FormattedBook = [];

      booksData?.forEach((item, i) => {
        if (item.readEnd.month !== currentMonth) {
          result.push({ title: currentMonth, data: [{ books: arr }] });
          arr = [];
          currentMonth = item.readEnd.month;
        }
        arr.push(item);
        if (booksData.length - 1 === i) {
          result.push({ title: currentMonth, data: [{ books: arr }] });
        }
      });
      setFormattedBooksState(result);
    }
  }, [data]);

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}

      {!!data && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundMain, flex: 1 }}>
          <SectionList
            sections={formattedBooks}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <FlatList
                data={item.books}
                numColumns={3}
                horizontal={false}
                columnWrapperStyle={{ marginVertical: 12, marginLeft: 20 }}
                renderItem={({ item }) => (
                  <ImageCard
                    uri={item.books.bookCover}
                    width={100}
                    height={162}
                    style={{ marginRight: 5, marginLeft: 10 }}
                    id={item.books.id}
                    handleClick={() => handleClickBook(item.books.id)}
                  />
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
            ListHeaderComponent={() => <Text style={styles.mainTitle}>{year}</Text>}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default BooksByDate;
