import { FC, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Book } from 'types';
import { ImageCard } from '../../UI';
import { themeContext } from '../../theme';
import { ONE_AUTHOR_BY_ID } from '../../graphQL';
import { SectionList, ActivityIndicator, SafeAreaView, Text, View, FlatList } from 'react-native';
import { AuthorProps, AuthorQuery } from './type';

const Author: FC<AuthorProps> = ({ route, navigation }) => {
  const { id } = route?.params;
  const [booksData, setBooks] = useState<{ title: string; data: [{ booksData: Book[] }] }[]>([]);

  const { loading, error, data } = useQuery<AuthorQuery>(ONE_AUTHOR_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    setBooks([]);
    if (!!data?.author?.series?.length) {
      setBooks(
        data.author.series.map((item) => {
          return {
            title: item.title,
            data: [{ booksData: item.booksInSeries }],
          };
        })
      );
    }
    if (!!data?.author?.booksWithoutSeries?.length) {
      setBooks((prevState) => [
        ...prevState,
        {
          title: 'Books outside the series',
          data: [{ booksData: data.author.booksWithoutSeries }],
        },
      ]);
    }
  }, [data]);

  const colors = useContext(themeContext);

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      {!!booksData && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
          <SectionList
            sections={booksData}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item }) => (
              <FlatList
                data={item.booksData}
                numColumns={3}
                horizontal={false}
                columnWrapperStyle={{ marginBottom: 10, marginLeft: 20 }}
                renderItem={({ item }) => (
                  <ImageCard
                    uri={item.bookCoverThumbnail}
                    width={100}
                    height={162}
                    style={{ marginRight: 5, marginLeft: 10 }}
                    id={item.id}
                    handleClick={handleClick}
                  />
                )}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ marginBottom: 15 }}>&nbsp;&nbsp;{title}&nbsp;&nbsp;</Text>
            )}
            ListHeaderComponent={() => (
              <>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <ImageCard uri={data?.author.portrait || ''} width={250} height={415} />
                </View>
                <Text
                  style={{ marginTop: 15, marginBottom: 15, fontSize: 30, textAlign: 'center' }}
                >
                  {data?.author.name || ''} {data?.author.surname || ''}
                </Text>
              </>
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Author;
