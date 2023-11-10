import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/NavigationType';
import { Author as IAuthor } from 'types';

export type AuthorProps = NativeStackScreenProps<RootStackParamList, 'Author', 'id'>;

export interface AuthorQuery {
  author: IAuthor;
}
