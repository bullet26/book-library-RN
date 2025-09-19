import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { GetOneAuthorByIdQuery } from '../../graphQL/__generated__/graphql';

export type AuthorProps = NativeStackScreenProps<RootStackParamList, 'Author', 'id'>;

export type FormattedBooksData = {
  title: string;
  data: {
    booksData: NonNullable<
      NonNullable<GetOneAuthorByIdQuery['author']>['series']
    >[number]['booksInSeries'];
  }[];
}[];
