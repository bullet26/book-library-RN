import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AllMediaForItem, BookStackParamList, Book as IBook, Plot } from 'types';

export interface BookQuery {
  book: IBook;
}

export interface BookPlotQuery {
  book: Plot;
}

export interface BooMediaQuery {
  book: { id: string; title: string; media: AllMediaForItem };
}

export type BookDetailProps = NativeStackScreenProps<BookStackParamList, 'BookDetail', 'id'>;
export type BookPlotProps = NativeStackScreenProps<BookStackParamList, 'BookPlot', 'id'>;
export type BookMediaProps = NativeStackScreenProps<BookStackParamList, 'BookMedia', 'id'>;
