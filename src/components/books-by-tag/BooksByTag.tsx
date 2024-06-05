import { FC, useContext, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { ALL_BOOKS_BY_TAG } from '../../graphQL';
import { ImageCard, Rating } from '../../UI';
import { BooksByTagQuery, BooksByTagProps } from './type';
import { themeContext } from '../../theme';
import { TagSelect } from './tag-select';

export const BooksByTag: FC<BooksByTagProps> = ({ route, navigation }) => {
  const [tagID, setTagID] = useState(route?.params?.id);
  const [routeTagID, setRouteTagID] = useState(route?.params?.id);
  const [sortBy, setSortType] = useState('title');

  const [getBooks, { loading, error, data }] = useLazyQuery<BooksByTagQuery>(ALL_BOOKS_BY_TAG);

  useFocusEffect(() => {
    setRouteTagID(route?.params?.id);
  });

  useEffect(() => {
    setTagID(routeTagID);
  }, [routeTagID]);

  useEffect(() => {
    getBooks({
      variables: {
        id: tagID,
        sortBy,
      },
    });
  }, [tagID, sortBy]);

  const handleChangeTag = (id: string, sortBy: string) => {
    setTagID(id);
    setSortType(sortBy);
  };

  const colors = useContext(themeContext);

  const handleClickBook = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      {!loading && (
        <SafeAreaView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 25 }}>Books by tag: </Text>
            <Text style={{ fontSize: 25, color: 'purple' }}>#{data?.tagData.tag}</Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginVertical: 5,
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 18 }}>Books sort by: </Text>
            <Text style={{ fontSize: 18, color: 'purple' }}>{sortBy}</Text>
          </View>
          <TagSelect
            tag={data?.tagData.tag}
            tagID={tagID}
            handleChange={handleChangeTag}
            sortBy={sortBy}
          />
          <FlatList
            data={data?.tagData.booksInTag}
            numColumns={3}
            horizontal={false}
            columnWrapperStyle={{ marginVertical: 12, marginLeft: 20 }}
            renderItem={({ item }) => (
              <View>
                <ImageCard
                  uri={item.bookCoverThumbnail}
                  width={100}
                  height={162}
                  style={{ marginRight: 5, marginLeft: 10 }}
                  id={item.id}
                  handleClick={() => handleClickBook(item.id)}
                />
                <Rating rating={item.rating || 0} type="circle-only" />
              </View>
            )}
            keyExtractor={(item, index) => item.id || index.toString()}
          />
        </SafeAreaView>
      )}
    </>
  );
};
