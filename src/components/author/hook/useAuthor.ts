import { useQuery } from '@apollo/client/react';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ONE_AUTHOR_BY_ID } from '../../../graphQL';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthorsStackParamList, TabParamList } from '../../../types';
import { GetOneAuthorByIdQuery } from '../../../graphQL/__generated__/graphql';
import { useMemo } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type AuthorScreenRouteProp = RouteProp<AuthorsStackParamList, 'Author'>;
type AuthorNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthorsStackParamList, 'Author'>,
  BottomTabNavigationProp<TabParamList>
>;

export type FormattedBooksData = {
  title: string;
  data: {
    booksData: NonNullable<
      NonNullable<GetOneAuthorByIdQuery['author']>['series']
    >[number]['booksInSeries'];
  }[];
}[];

export const useAuthor = () => {
  const navigation = useNavigation<AuthorNavigationProp>();
  const route = useRoute<AuthorScreenRouteProp>();

  const id = route?.params?.id;

  const { loading, error, data } = useQuery(ONE_AUTHOR_BY_ID, {
    skip: !id,
    variables: { id },
  });

  const author = data?.author;

  const { booksData, booksQuant, booksAverageRating } = useMemo(() => {
    const booksData: FormattedBooksData = [];

    const series = author?.series;
    const books = author?.booksWithoutSeries;
    let booksInSeriesQuant = 0;
    let booksWithoutSeriesQuant = books?.length || 0;
    let booksInSeriesTotalRating = 0;
    let booksWithoutSeriesTotalRating = 0;

    if (series) {
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

    if (books) {
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
    const booksAverageRating = booksQuant
      ? Math.ceil(((booksInSeriesTotalRating + booksWithoutSeriesTotalRating) / booksQuant) * 100) /
        100
      : 0;

    return {
      booksData,
      booksQuant,
      booksAverageRating,
    };
  }, [author]);

  const handleClickBook = (id: string) => {
    navigation.navigate('BooksTab', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  return { author, handleClickBook, booksData, booksQuant, booksAverageRating, loading, error };
};
