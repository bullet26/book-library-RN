import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Button, View } from 'react-native';
import { useLazyQuery } from '@apollo/client/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_AUTHORS } from '../../graphQL';
import { colors } from '../../theme';
import { ImageCard } from '../../UI';
import { Header } from '..';
import { AuthorsDaa, AuthorsProps } from './type';

export const CardListAuthors = ({ navigation }: AuthorsProps) => {
  const [getAuthors, { loading, error, data }] = useLazyQuery(ALL_AUTHORS);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1000000);
  const [allData, setData] = useState<AuthorsDaa>([]);
  const [debounceStatus, setDebounce] = useState(false);

  useEffect(() => {
    if (allData.length < totalCount) {
      if (loading || debounceStatus) {
        return;
      }

      getAuthors({
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
      setData(prevState => [...prevState, ...data?.getAllAuthors.authors]);
      setTotalCount(data.getAllAuthors.totalCount);
    }
  }, [data]);

  const handleClick = (id: string) => {
    navigation.navigate('Author', { id });
  };

  const handleClickMostReded = () => {
    navigation.navigate('MostRededAuthors');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <Header />
      <Button title="Show most reded authors" color="#6c0e4b" onPress={handleClickMostReded} />
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
          <ImageCard
            uri={item.portraitThumbnail}
            width={180}
            height={315}
            style={{ marginRight: 5, marginLeft: 10 }}
            id={item.id}
            handleClick={handleClick}
            title={`${item.surname}, ${item.name}`}
            titlePosition="bottom"
          />
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        onEndReached={() => setPage(prevState => prevState + 1)}
        onEndReachedThreshold={0.5}
      />
      {loading && page > 1 && <ActivityIndicator size="small" color={colors.primary} />}
    </SafeAreaView>
  );
};
