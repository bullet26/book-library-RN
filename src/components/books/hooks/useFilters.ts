import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { useQuery } from '@apollo/client/react';
import { ALL_TAGS, READ_STATISTIC } from '../../../graphQL';
import type { BookFilterInput } from '../../../graphQL/__generated__/graphql';
import { BookSortBy } from '../../../graphQL/__generated__/enums';
import { BooksStackParamList, TabParamList } from '../../../types/index';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BooksScreenRouteProp = RouteProp<BooksStackParamList, 'BooksList'>;
type BooksNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BooksList'>,
  BottomTabNavigationProp<TabParamList>
>;

export const useFilters = () => {
  const navigation = useNavigation<BooksNavigationProp>();
  const route = useRoute<BooksScreenRouteProp>();

  const routeParams = route.params || {};

  const selectedTag = routeParams.tagId ?? undefined;
  const selectedRating = routeParams.rating ?? undefined;
  const selectedYear = routeParams.year ?? undefined;
  const sortBy = routeParams.sortBy ?? BookSortBy.DateDesc;

  const { data: tags, error: tagError } = useQuery(ALL_TAGS, {});
  const { data: years, error: yearsError } = useQuery(READ_STATISTIC, {
    variables: { label: 'all' },
  });

  const handleFilterChange = (filter: keyof BookFilterInput | 'sortBy', value: string | null) => {
    navigation.setParams({
      [filter]: value,
      page: 1,
    });
  };

  const resetFilters = () => {
    const defaultFilters = {
      tagId: undefined,
      rating: undefined,
      year: undefined,
      sortBy: BookSortBy.DateDesc,
      page: 1,
    };

    navigation.setParams(defaultFilters);
  };

  return {
    tags: tags?.tags || [],
    years: years?.statistic || [],
    error: [tagError?.message, yearsError?.message].filter(Boolean).join(', '),
    selectedTag,
    selectedRating,
    selectedYear,
    sortBy,
    resetFilters,
    handleFilterChange,
  };
};
