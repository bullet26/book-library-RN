import { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { useLazyQuery } from '@apollo/client/react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_BOOKS_BY_TAG } from '../../graphQL';
import { ImageCard, Rating } from '../../UI';
import { BooksByTagProps } from './type';
import { colors } from '../../theme';
import { TagSelect } from './tag-select';

export const BooksByTag = ({ route, navigation }: BooksByTagProps) => {
  const [tagID, setTagID] = useState(route.params.id);
  const [routeTagID, setRouteTagID] = useState(route.params.id);
  const [sortBy, setSortType] = useState('title');

  const [getBooks, { loading, error, data }] = useLazyQuery(ALL_BOOKS_BY_TAG);

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

  const handleClickBook = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <>
      {!!loading && (
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

      {!loading && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundMain, flex: 1 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 25, color: colors.textMain }}>Books by tag: </Text>
            <Text style={{ fontSize: 25, color: colors.primary }}>#{data?.tagData.tag}</Text>
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
            <Text style={{ fontSize: 18, color: colors.textAccent }}>Books sort by: </Text>
            <Text style={{ fontSize: 18, color: colors.primary }}>{sortBy}</Text>
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
                  title={item.title}
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
