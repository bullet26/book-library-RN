import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'types/NavigationType/NavigationType';

export type BooksByDateProps = NativeStackNavigationProp<
  RootStackParamList,
  'BookBySpecificDate',
  'year'
>;
