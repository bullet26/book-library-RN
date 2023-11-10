import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookStackParamList, Book as IBook, Plot } from 'types';

export interface BookQuery {
  book: IBook;
}

export interface BookPlotQuery {
  book: Plot;
}

export type BookDetailProps = NativeStackScreenProps<BookStackParamList, 'BookDetail', 'id'>;
export type BookPlotProps = NativeStackScreenProps<BookStackParamList, 'BookPlot', 'id'>;
