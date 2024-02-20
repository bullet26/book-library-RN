import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/NavigationType';
import { Tag } from 'types';

export type BooksByTagProps = NativeStackScreenProps<RootStackParamList, 'BookByTag'>;

export interface BooksByTagQuery {
  tagData: Tag;
}
