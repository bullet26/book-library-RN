import { FC, useEffect, useState, useContext } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { SvgUri } from 'react-native-svg';
import { ALL_AUTHORS } from '../../graphQL';
import { Author } from 'types';
import { themeContext } from '../../theme';

interface AuthorsQuery {
  getAllAuthors: { authors: Author[]; totalCount: number };
}

const CardListAuthors: FC = () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      {loading && page === 1 && <ActivityIndicator size="large" color={colors.primary} />}

      <FlatList
        data={allData}
        numColumns={2}
        horizontal={false}
        columnWrapperStyle={{ marginBottom: 10 }}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => console.log(item.id)}>
            {!!item.portrait ? (
              <Image
                source={{ uri: item.portrait }}
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

export default CardListAuthors;
