import { FC, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Book } from 'types';
import { ImageCard, Rating } from '../../UI';
import { colors } from '../../theme';
import { ONE_AUTHOR_BY_ID } from '../../graphQL';
import { SectionList, ActivityIndicator, SafeAreaView, Text, View, FlatList } from 'react-native';
import { AuthorProps, AuthorQuery } from './type';
import { colorRate } from '../../utils';

const Author: FC<AuthorProps> = ({ route, navigation }) => {
  const { id } = route?.params;
  //const [booksData, setBooks] = useState<{ title: string; data: [{ booksData: Book[] }] }[]>([]);

  const { loading, error, data } = useQuery<AuthorQuery>(ONE_AUTHOR_BY_ID, {
    variables: { id },
  });

  const { booksData, booksQuant, booksAverageRating } = useMemo(() => {
    const booksData: { title: string; data: [{ booksData: Book[] }] }[] = [];
    const series = data?.author?.series;
    const books = data?.author?.booksWithoutSeries;
    let booksInSeriesQuant = 0;
    let booksWithoutSeriesQuant = books?.length || 0;
    let booksInSeriesTotalRating = 0;
    let booksWithoutSeriesTotalRating = 0;

    if (!!series) {
      series.forEach(({ title, booksInSeries }) => {
        booksInSeriesQuant += booksInSeries?.length || 0;
        booksInSeries.forEach(({ rating }) => (booksInSeriesTotalRating += rating));

        booksData.push({
          title,
          data: [{ booksData: booksInSeries }],
        });
      });
    }

    if (!!books) {
      booksData.push({
        title: 'Books outside the series',
        data: [{ booksData: books }],
      });

      books.forEach(({ rating }) => (booksWithoutSeriesTotalRating += rating));
    }

    const booksQuant = booksInSeriesQuant + booksWithoutSeriesQuant;
    const booksAverageRating =
      Math.ceil(((booksInSeriesTotalRating + booksWithoutSeriesTotalRating) / booksQuant) * 100) /
      100;

    return {
      booksData,
      booksQuant,
      booksAverageRating,
    };
  }, [data?.author]);

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return (
    <>
      {(!!loading || !booksData.length) && (
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
      {!!booksData.length && (
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
                  <View>
                    <ImageCard
                      uri={item.bookCoverThumbnail}
                      width={100}
                      height={162}
                      style={{ marginRight: 5, marginLeft: 10 }}
                      id={item.id}
                      handleClick={handleClick}
                    />
                    <Rating rating={item.rating || 0} type="circle-only" />
                  </View>
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
                <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center' }}>
                  {data?.author.name || ''} {data?.author.surname || ''}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20 }}>
                  Total number of books read: {booksQuant || 'unknown'}
                </Text>
                <Text style={{ marginTop: 10, marginBottom: 15, fontSize: 20 }}>
                  Average rating:
                  <Text style={{ color: colorRate(booksAverageRating) }}>
                    {booksAverageRating || 'unknown'}
                  </Text>
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
