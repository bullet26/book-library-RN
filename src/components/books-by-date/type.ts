import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/NavigationType';
import { ReadDateBook } from 'types';

export type BooksByDateProps = NativeStackScreenProps<RootStackParamList, 'BookBySpecificDate'>;

export interface BooksByDateQuery {
  bookInYear: ReadDateBook[];
}

export type FormattedBook = { title: string; data: [{ books: ReadDateBook[] }] }[];

export interface CardListBooksByDateProps {
  handleClickBook: (id: string) => void;
  year: string;
  booksData: FormattedBook;
}
