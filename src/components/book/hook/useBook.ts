import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  CompositeNavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BooksStackParamList, TabParamList } from '../../../types';
import { ALL_MEDIA_FOR_BOOK, ONE_BOOK_BY_ID, ONE_BOOK_PLOT } from '../../../graphQL';
import { useQuery } from '@apollo/client/react';
import { Linking } from 'react-native';

type BookMediaScreenRouteProp = RouteProp<BooksStackParamList, 'BookMedia'>;
type BookPlotScreenRouteProp = RouteProp<BooksStackParamList, 'BookPlot'>;
type BookDetailScreenRouteProp = RouteProp<BooksStackParamList, 'BookDetail'>;

type BookPlotNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BookPlot'>,
  BottomTabNavigationProp<TabParamList>
>;

type BookDetailNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<BooksStackParamList, 'BookDetail'>,
  BottomTabNavigationProp<TabParamList>
>;

export const useBookDetail = () => {
  const route = useRoute<BookDetailScreenRouteProp>();
  const navigation = useNavigation<BookDetailNavigationProp>();

  const { id } = route?.params || {};

  const { loading, data } = useQuery(ONE_BOOK_BY_ID, {
    skip: !id,
    variables: { id },
  });

  const bookCover = data?.book?.bookCover || '';

  const handleClickTag = (id: string) => {
    navigation.navigate('BooksList', { tagId: id });
  };

  const goToBookPlot = () => {
    navigation.navigate('BookPlot', { id });
  };

  const goToBookMedia = () => {
    navigation.navigate('BookMedia', { id });
  };

  const goToAuthor = (id: string) => {
    navigation.navigate('AuthorsTab', {
      screen: 'Author',
      params: { id },
    });
  };

  const goToAnotherBook = (nextBookId: string) => {
    navigation.push('BookDetail', { id: nextBookId });
  };

  const goToBooksByYear = (year: string | number) => {
    navigation.navigate('BooksListByYear', { year });
  };

  return {
    loading,
    book: data?.book,
    bookCover,
    goToBookPlot,
    goToBookMedia,
    goToAuthor,
    goToAnotherBook,
    goToBooksByYear,
    handleClickTag,
  };
};

export const useBookMedia = () => {
  const route = useRoute<BookMediaScreenRouteProp>();

  const { id } = route.params || {};

  const { loading, data } = useQuery(ALL_MEDIA_FOR_BOOK, {
    skip: !id,
    variables: { id },
  });

  const media = data?.book?.media;

  const getImgIndex = (id: string) => {
    const currentIndex = media?.image.findIndex(item => item.id === id) || 0;
    return currentIndex === -1 ? 0 : currentIndex;
  };

  const handleClickVideo = async (id: string) => {
    const url = media?.video.find(item => item.id === id)?.url;

    if (url) await Linking.openURL(url);
  };

  return { loading, media, getImgIndex, handleClickVideo };
};

export const useBookPlot = () => {
  const route = useRoute<BookPlotScreenRouteProp>();
  const navigation = useNavigation<BookPlotNavigationProp>();

  const { id } = route?.params;

  const { loading, data } = useQuery(ONE_BOOK_PLOT, {
    skip: !id,
    variables: { bookID: id },
  });

  const goToBookDetail = () => {
    navigation.navigate('BookDetail', { id });
  };

  return { loading, data, goToBookDetail };
};
