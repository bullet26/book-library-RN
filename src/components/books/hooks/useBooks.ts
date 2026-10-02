import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../../../graphQL';
import { BookSortBy } from '../../../graphQL/__generated__/enums';
import { BooksStackParamList, TabParamList } from '../../../types/index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type BooksScreenRouteProp = RouteProp<BooksStackParamList, 'BooksList'>;
type BooksNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BooksList'>,
  BottomTabNavigationProp<TabParamList>
>;
export const useBooks = () => {
  const navigation = useNavigation<BooksNavigationProp>();
  const route = useRoute<BooksScreenRouteProp>();

  const params = route.params || {};

  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 50;
  const sortBy = (params.sortBy as BookSortBy) || BookSortBy.DateDesc;

  const tagId = params.tagId || null;
  const rating = params.rating || null;
  const year = params.year || null;

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: {
      page,
      limit,
      filter: {
        ...(tagId && { tagId }),
        ...(rating && { rating: Number(rating) }),
        ...(year && { year: Number(year) }),
      },
      sort: sortBy,
    },
  });

  const books = data?.getBooks?.books || [];
  const totalCount = data?.getBooks?.totalCount || 0;

  const handlePagination = (current: number, pageSize: number) => {
    navigation.setParams({
      page: current,
      limit: pageSize,
    });
  };

  const handleClickCard = (id?: string) => {
    if (id) {
      navigation.navigate('BooksTab', {
        screen: 'BookDetail',
        params: { id },
      });
    }
  };

  return {
    books,
    totalCount,
    loading,
    error: error?.message,
    page,
    limit,
    handleClickCard,
    handlePagination,
  };
};
