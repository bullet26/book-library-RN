import { FC, useEffect, useState, useContext } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../../graphQL';
import { Author } from 'types';
import { themeContext } from '../../theme';
import { ImageCard } from '../../UI';
import { Header } from '../../components';
import { AuthorsQuery, AuthorsProps } from './type';

const CardListAuthors: FC<AuthorsProps> = ({ navigation }) => {
  const [getAuthors, { loading, error, data }] = useLazyQuery<AuthorsQuery>(ALL_AUTHORS);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1000000);
  const [allData, setData] = useState<Author[]>([]);
  const [debounceStatus, setDebounce] = useState(false);
  const colors = useContext(themeContext);

  useEffect(() => {
    console.log('getAuthors', page);

    if (allData.length < totalCount) {
      if (loading || debounceStatus) {
        return;
      }
      console.log(debounceStatus);

      getAuthors({
        variables: {
          page,
          limit: 30,
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
      console.log('setData');

      setData((prevState) => [...prevState, ...data?.getAllAuthors.authors]);
      setTotalCount(data.getAllAuthors.totalCount);
    }
  }, [data]);

  const handleClick = (id: string) => {
    navigation.navigate('Author', { id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <Header />
      {loading && page === 1 && <ActivityIndicator size="large" color={colors.primary} />}
      <FlatList
        data={allData}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <ImageCard
            uri={item.portraitThumbnail}
            width={180}
            height={315}
            style={{ marginRight: 5, marginLeft: 10 }}
            id={item.id}
            handleClick={handleClick}
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        onEndReached={() => setPage((prevState) => prevState + 1)}
        onEndReachedThreshold={0.5}
      />
      {loading && page > 1 && <ActivityIndicator size="small" color={colors.primary} />}
    </SafeAreaView>
  );
};

export default CardListAuthors;
