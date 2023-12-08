import { FC, useContext, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_BY_SPECIFIC_DATE } from '../../graphQL';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { ReadDateBook } from 'types';
import { BooksByDateProps, FormattedBook, BooksByDateQuery } from './type';
import { themeContext } from '../../theme';
import { YearSelect } from './date-select';
import { CardListBooksByDate } from './CardListBooksByDate';

const BooksByDate: FC<BooksByDateProps> = ({ route, navigation }) => {
  const routeYear = route?.params?.year;
  const [year, setYear] = useState('');

  const [getBooks, { loading, error, data }] = useLazyQuery<BooksByDateQuery>(
    ALL_BOOKS_BY_SPECIFIC_DATE
  );

  const colors = useContext(themeContext);

  const [formattedBooks, setFormattedBooksState] = useState<FormattedBook>([]);

  const handleClickBook = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  const handleChangeYear = (year: string) => {
    setYear(year);
  };

  useEffect(() => {
    setYear(routeYear || null);
  }, [routeYear]);

  useEffect(() => {
    getBooks({
      variables: {
        year: Number(year),
      },
    });
  }, [year]);

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
      {!loading && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundMain, flex: 1 }}>
          <YearSelect year={year} handleChange={handleChangeYear} />
          {!!formattedBooks.length && !!year && (
            <CardListBooksByDate
              handleClickBook={handleClickBook}
              year={year}
              booksData={formattedBooks}
            />
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default BooksByDate;
