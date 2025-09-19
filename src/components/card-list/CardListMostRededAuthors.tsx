import { FlatList, ActivityIndicator, View } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ALL_AUTHORS_BY_BOOKS_COUNT } from '../../graphQL';
import { colors } from '../../theme';
import { CountBadge, ImageCard } from '../../UI';
import { Header } from '../header';
import { MostRededAuthorsProps } from './type';

export const CardListMostRededAuthors = ({ navigation }: MostRededAuthorsProps) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS_BY_BOOKS_COUNT);

  const handleClick = (id: string) => {
    navigation.navigate('Author', { id });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundMain }}>
      <Header />
      {loading && (
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
      {!!data && (
        <FlatList
          data={data?.authors || []}
          numColumns={2}
          horizontal={false}
          columnWrapperStyle={{ marginBottom: 10 }}
          renderItem={({ item }) => (
            <View>
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
              <CountBadge count={item.count} />
            </View>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
          onEndReachedThreshold={0.5}
        />
      )}
    </SafeAreaView>
  );
};
