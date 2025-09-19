import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { useLazyQuery } from '@apollo/client/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_BOOKS_BY_DATE } from '../../graphQL';
import { colors } from '../../theme';
import { ImageCard, Rating } from '../../UI';
import { Header } from '../../components';
import { BookProps, ReadDateBook } from './type';

export const CardListBooks = ({ navigation }: BookProps) => {
  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS_BY_DATE);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1000000);
  const [allData, setData] = useState<ReadDateBook>([]);
  const [debounceStatus, setDebounce] = useState(false);

  useEffect(() => {
    if (allData.length < totalCount) {
      if (loading || debounceStatus) {
        return;
      }

      getBooks({
        variables: {
          page,
          limit: 20,
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
      setData(prevState => [...prevState, ...data?.books.readDate]);
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
        onEndReached={() => setPage(prevState => prevState + 1)}
        onEndReachedThreshold={0.5}
      />
      {loading && page > 1 && <ActivityIndicator size="small" color={colors.primary} />}
    </SafeAreaView>
  );
};
