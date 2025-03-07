import { FC, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, View } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_BY_DATE } from '../../graphQL';
import { ReadDateBook } from 'types';
import { colors } from '../../theme';
import { ImageCard, Rating } from '../../UI';
import { Header } from '../../components';
import { BookProps, BooksQuery } from './type';

const CardListBooks: FC<BookProps> = ({ navigation }) => {
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

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <Header />
      {loading && page === 1 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: colors.backgroundMain,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <FlatList
        data={allData}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <View>
            <ImageCard
              uri={item.books.bookCoverThumbnail}
              width={180}
              height={315}
              style={{ marginRight: 5, marginLeft: 10 }}
              id={item.books.id}
              handleClick={handleClick}
              title={item.books.title}
            />
            <Rating rating={item.books.rating || 0} type="circle-only" />
          </View>
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
