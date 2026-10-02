import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { GetAllAuthorsQuery, GetAllBooksByDateQuery } from '../../graphQL/__generated__/graphql';

export type BookProps = NativeStackScreenProps<RootStackParamList, 'Books'>;

export type AuthorsProps = NativeStackScreenProps<RootStackParamList, 'Authors'>;

export type MostRededAuthorsProps = NativeStackScreenProps<RootStackParamList, 'MostRededAuthors'>;

export type ReadDateBook = NonNullable<GetAllBooksByDateQuery['books']>['readDate'];

export type AuthorsDaa = NonNullable<GetAllAuthorsQuery>['getAllAuthors']['authors'];
