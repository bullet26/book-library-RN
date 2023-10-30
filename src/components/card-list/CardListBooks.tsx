import { FC, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { SvgUri } from 'react-native-svg';
import { ALL_BOOKS_BY_DATE } from '../../graphQL';
import { ReadDateBook } from 'types';
import { themeContext } from '../../theme';

interface BooksQuery {
  books: { readDate: ReadDateBook[]; totalCount: number };
}

type CLNavigationProp = NavigationProp<
  {
    Book: {
      screen: 'BookDetail';
      params: { [id: string]: string };
    };
  },
  'Book'
>;

const CardListBooks: FC<{ navigation: CLNavigationProp }> = ({ navigation }) => {
  const [getBooks, { loading, error, data }] = useLazyQuery<BooksQuery>(ALL_BOOKS_BY_DATE);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1000000);
  const [allData, setData] = useState<ReadDateBook[]>([]);
  const [debounceStatus, setDebounce] = useState(false);

  const colors = useContext(themeContext);

  useEffect(() => {
    console.log('getBooks', page);

    if (allData.length < totalCount) {
      if (loading || debounceStatus) {
        return;
      }
      console.log(debounceStatus);

      getBooks({
        variables: {
          page,
          limit: 50,
        },
      });
    }
    setDebounce(true);
    setTimeout(() => {
      setDebounce(false);
    }, 1000);
  }, [page]);

  useEffect(() => {
    if (data) {
      console.log('setDta');

      setData((prevState) => [...prevState, ...data?.books.readDate]);
      setTotalCount(data.books.totalCount);
    }
  }, [data]);

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      {loading && page === 1 && <ActivityIndicator size="large" color={colors.primary} />}
      <FlatList
        data={allData}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleClick(item.books.id)}>
            {!!item.books.bookCover ? (
              <Image
                source={{ uri: item.books.bookCover }}
                style={{ width: 180, height: 315, marginRight: 5, marginLeft: 10 }}
              />
            ) : (
              <SvgUri
                width="180px"
                height="315px"
                uri="https://res.cloudinary.com/dlyawnfbk/image/upload/v1698343659/book-cover_ijn21c.svg"
              />
            )}
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        onEndReached={() => setPage((prevState) => prevState + 1)}
        onEndReachedThreshold={0.5}
      />
      {loading && page > 1 && <ActivityIndicator size="small" color={colors.primary} />}
    </SafeAreaView>
  );
};

export default CardListBooks;
