import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookStackParamList } from '../../types';

export type BookDetailProps = NativeStackScreenProps<BookStackParamList, 'BookDetail', 'id'>;
export type BookPlotProps = NativeStackScreenProps<BookStackParamList, 'BookPlot', 'id'>;
export type BookMediaProps = NativeStackScreenProps<BookStackParamList, 'BookMedia', 'id'>;
