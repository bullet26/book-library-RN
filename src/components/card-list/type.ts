import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReadDateBook, Author, MostRededAuthorResponse } from 'types';
import { RootStackParamList } from 'types/NavigationType/NavigationType';

export interface BooksQuery {
  books: { readDate: ReadDateBook[]; totalCount: number };
}

export type BookProps = NativeStackScreenProps<RootStackParamList, 'Books'>;

export interface AuthorsQuery {
  getAllAuthors: { authors: Author[]; totalCount: number };
}
export interface MostRededAuthorsQuery {
  authors: MostRededAuthorResponse[];
}

export type AuthorsProps = NativeStackScreenProps<RootStackParamList, 'Authors'>;

export type MostRededAuthorsProps = NativeStackScreenProps<RootStackParamList, 'MostRededAuthors'>;
