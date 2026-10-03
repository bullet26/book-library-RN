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
import { useState, useEffect } from 'react';

type BooksScreenRouteProp = RouteProp<BooksStackParamList, 'BooksList'>;
type BooksNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BooksList'>,
  BottomTabNavigationProp<TabParamList>
>;

export const useFilters = () => {
  const navigation = useNavigation<BooksNavigationProp>();
  const route = useRoute<BooksScreenRouteProp>();

  const routeParams = route.params || {};

  const tagId = routeParams.tagId;
  const rating = routeParams.rating;
  const year = routeParams.year;
  const sortBy = routeParams.sortBy ?? BookSortBy.DateDesc;

  const [draftMobileFilters, setDraftMobileFilters] = useState({ tagId, rating, year, sortBy });

  useEffect(() => {
    setDraftMobileFilters({ tagId, rating, year, sortBy });
  }, [tagId, rating, year, sortBy]);

  const { data: tags, error: tagError } = useQuery(ALL_TAGS, {});
  const { data: years, error: yearsError } = useQuery(READ_STATISTIC, {
    variables: { label: 'all' },
  });

  const handleFilterChange = (filter: keyof BookFilterInput | 'sortBy', value?: string | null) => {
    setDraftMobileFilters(prev => ({ ...prev, [filter]: value }));
  };

  const resetFilters = () => {
    const defaultFilters = {
      tagId: undefined,
      rating: undefined,
      year: undefined,
      sortBy: BookSortBy.DateDesc,
    };

    setDraftMobileFilters(defaultFilters);
    navigation.setParams({ ...defaultFilters, page: 1 });
  };

  const applyFilters = () => {
    navigation.setParams({
      ...draftMobileFilters,
      page: 1,
    });
  };

  return {
    tags: tags?.tags || [],
    years: years?.statistic || [],
    error: [tagError?.message, yearsError?.message].filter(Boolean).join(', '),
    selectedTag: draftMobileFilters.tagId,
    selectedRating: draftMobileFilters.rating,
    selectedYear: draftMobileFilters.year,
    sortBy,
    resetFilters,
    handleFilterChange,
    applyFilters,
  };
};

export const bookSortByLabels: { [key in BookSortBy]: string } = {
  [BookSortBy.AuthorAsc]: 'Author (A-Z)',
  [BookSortBy.AuthorDesc]: 'Author (Z-A)',
  [BookSortBy.DateAsc]: 'Date (Oldest First)',
  [BookSortBy.DateDesc]: 'Date (Newest First)',
  [BookSortBy.RatingAsc]: 'Rating (Lowest First)',
  [BookSortBy.RatingDesc]: 'Rating (Highest First)',
  [BookSortBy.TitleAsc]: 'Title (A-Z)',
  [BookSortBy.TitleDesc]: 'Title (Z-A)',
};
