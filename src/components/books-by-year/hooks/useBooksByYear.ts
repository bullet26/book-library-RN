import { useMemo, useState } from 'react';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS, READ_STATISTIC } from '../../../graphQL';
import { BookSortBy } from '../../../graphQL/__generated__/enums';
import { AllBooks, BooksStackParamList, TabParamList } from '../../../types/index';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface MonthGroup {
  month: string;
  books: AllBooks;
}

type BooksScreenRouteProp = RouteProp<BooksStackParamList, 'BooksListByYear'>;
type BooksNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BooksListByYear'>,
  BottomTabNavigationProp<TabParamList>
>;

export const useBooksByYear = () => {
  const navigation = useNavigation<BooksNavigationProp>();
  const route = useRoute<BooksScreenRouteProp>();

  const [year, setYear] = useState<string>(route.params.year.toString());

  const { loading, error, data } = useQuery(ALL_BOOKS, {
    skip: !year,
    variables: {
      page: 1,
      limit: 100,
      filter: { year: Number(year) },
      sort: BookSortBy.DateAsc,
    },
  });

  const { data: years } = useQuery(READ_STATISTIC, {
    variables: { label: 'all' },
  });

  const books = useMemo<MonthGroup[]>(() => {
    const booksData = data?.getBooks?.books || [];
    if (!booksData?.length) return [];

    const groupsMap = new Map<string, AllBooks>();

    booksData.forEach(item => {
      const month = item.readDate?.at(-1)?.readEnd?.month;

      if (!month) return;

      const currentList = groupsMap.get(month) ?? [];

      groupsMap.set(month, [...currentList, item]);
    });

    return Array.from(groupsMap.entries()).map(([month, books]) => ({
      month,
      books,
    }));
  }, [data?.getBooks?.books]);

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
    year,
    loading,
    error: error?.message,
    handleClickCard,
    years: years?.statistic || [],
    setYear: (value: string | number) => setYear(value.toString()),
  };
};
