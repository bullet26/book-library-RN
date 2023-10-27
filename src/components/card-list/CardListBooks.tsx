import { FC, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { SvgUri } from 'react-native-svg';
import { ALL_BOOKS_BY_DATE } from '../../apollo';
import { ReadDateBook } from 'types';

interface BooksQuery {
  books: { readDate: ReadDateBook[]; totalCount: number };
}

const CardListBooks: FC = () => {
  const [getBooks, { loading, error, data }] = useLazyQuery<BooksQuery>(ALL_BOOKS_BY_DATE);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1000000);
  const [allData, setData] = useState<ReadDateBook[]>([]);
  const [debounceStatus, setDebounce] = useState(false);

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

  return (
    <SafeAreaView>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}

      <FlatList
        data={allData}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => console.log(item.books.id)}>
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
    </SafeAreaView>
  );
};

export default CardListBooks;
