import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { ALL_AUTHORS, ALL_AUTHORS_BY_BOOKS_COUNT } from '../../../graphQL';
import { AuthorsStackParamList, TabParamList } from '../../../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export enum SortOptions {
  bookCount = 'bookCount',
  surname = 'surname',
}

export const ALL_SORT_OPTIONS = [
  { value: SortOptions.bookCount, label: 'By book count' },
  { value: SortOptions.surname, label: 'By last name' },
];

type AuthorsScreenRouteProp = RouteProp<AuthorsStackParamList, 'AuthorsList'>;
type AuthorsNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthorsStackParamList, 'AuthorsList'>,
  BottomTabNavigationProp<TabParamList>
>;

export const useAuthors = () => {
  const navigation = useNavigation<AuthorsNavigationProp>();
  const route = useRoute<AuthorsScreenRouteProp>();

  const params = route.params || {};

  const page = params.page ? Number(params.page) : 1;
  const limit = params.limit ? Number(params.limit) : 50;
  const sortBy = params.sortBy || SortOptions.surname;

  const {
    loading: loadingSurname,
    error: errorSurname,
    data: dataSurname,
  } = useQuery(ALL_AUTHORS, {
    skip: sortBy !== SortOptions.surname,
    variables: { page, limit },
  });

  const {
    loading: loadingCount,
    error: errorCount,
    data: dataCount,
  } = useQuery(ALL_AUTHORS_BY_BOOKS_COUNT, {
    skip: sortBy !== SortOptions.bookCount,
    variables: { page, limit },
  });

  const handleSortChange = (newSortBy: string) => {
    navigation.setParams({
      sortBy: newSortBy,
      page: 1,
    });
  };

  const handlePagination = (current: number, pageSize: number) => {
    navigation.setParams({
      page: current,
      limit: pageSize,
    });
  };

  const handleClickCard = (id?: string) => {
    if (!id) return;

    navigation.navigate('Author', { id });
  };

  const isBookCount = sortBy === SortOptions.bookCount;
  const loading = isBookCount ? loadingCount : loadingSurname;
  const error = isBookCount ? errorCount : errorSurname;

  const rawAuthors = isBookCount
    ? dataCount?.getAllAuthorsByBooksCount?.authors
    : dataSurname?.getAllAuthors?.authors;

  const totalCount = isBookCount
    ? dataCount?.getAllAuthorsByBooksCount?.totalCount
    : dataSurname?.getAllAuthors?.totalCount;

  return {
    authors: rawAuthors || [],
    totalCount: totalCount || 0,
    loading,
    error: error?.message,
    page,
    limit,
    sortBy,
    handleSortChange,
    handlePagination,
    handleClickCard,
  };
};
