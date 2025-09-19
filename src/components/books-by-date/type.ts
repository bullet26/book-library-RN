import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { GetAllBooksBySpecificDateQuery } from '../../graphQL/__generated__/graphql';

export type BooksByDateProps = NativeStackScreenProps<RootStackParamList, 'BookBySpecificDate'>;

export type ReadDateBook = NonNullable<
  NonNullable<GetAllBooksBySpecificDateQuery['bookInYear']>[number]
>;

export type FormattedBook = { title: string; data: [{ books: ReadDateBook[] }] }[];

export interface CardListBooksByDateProps {
  handleClickBook: (id: string) => void;
  year: string;
  booksData: FormattedBook;
}
