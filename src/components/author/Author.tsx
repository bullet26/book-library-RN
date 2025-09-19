import { useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCard, Rating } from '../../UI';
import { colors } from '../../theme';
import { ONE_AUTHOR_BY_ID } from '../../graphQL';
import { SectionList, ActivityIndicator, Text, View, FlatList } from 'react-native';
import { AuthorProps, FormattedBooksData } from './type';
import { colorRate } from '../../utils';

export const Author = ({ route, navigation }: AuthorProps) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery(ONE_AUTHOR_BY_ID, {
    skip: !id,
    variables: { id },
  });

  const { booksData, booksQuant, booksAverageRating } = useMemo(() => {
    const booksData: FormattedBooksData = [];

    const series = data?.author?.series;
    const books = data?.author?.booksWithoutSeries;
    let booksInSeriesQuant = 0;
    let booksWithoutSeriesQuant = books?.length || 0;
    let booksInSeriesTotalRating = 0;
    let booksWithoutSeriesTotalRating = 0;

    if (!!series) {
      series.forEach(({ title, booksInSeries }) => {
        booksInSeriesQuant += booksInSeries?.length || 0;
        booksInSeries.forEach(({ rating }) => {
          if (rating) {
            booksInSeriesTotalRating += rating;
          }
        });

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

      books.forEach(({ rating }) => {
        if (rating) {
          booksWithoutSeriesTotalRating += rating;
        }
      });
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
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1, paddingTop: 20 }}>
          <SectionList
            sections={booksData}
            keyExtractor={index => index.toString()}
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
                      title={item.title}
                    />
                    <Rating rating={item.rating || 0} type="circle-only" />
                  </View>
                )}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ marginBottom: 15, color: colors.textMain }}>
                &nbsp;&nbsp;{title}&nbsp;&nbsp;
              </Text>
            )}
            ListHeaderComponent={() => (
              <>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <ImageCard uri={data?.author?.portrait || ''} width={250} height={415} />
                </View>
                <Text
                  style={{
                    marginTop: 15,
                    fontSize: 30,
                    textAlign: 'center',
                    color: colors.textMain,
                  }}
                >
                  {data?.author?.name || ''} {data?.author?.surname || ''}
                </Text>
                <Text style={{ marginTop: 10, fontSize: 20, color: colors.textAccent }}>
                  Total number of books read:&nbsp;{booksQuant || 'unknown'}
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    marginBottom: 15,
                    fontSize: 20,
                    color: colors.textAccent,
                  }}
                >
                  Average rating:&nbsp;
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
