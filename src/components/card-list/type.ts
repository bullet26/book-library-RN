import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReadDateBook, Author } from 'types';
import { RootStackParamList } from 'types/NavigationType/NavigationType';

export interface BooksQuery {
  books: { readDate: ReadDateBook[]; totalCount: number };
}

export type BookProps = NativeStackScreenProps<RootStackParamList, 'Books'>;

export type AuthorsProps = NativeStackScreenProps<RootStackParamList, 'Authors'>;

export interface AuthorsQuery {
  getAllAuthors: { authors: Author[]; totalCount: number };
}
