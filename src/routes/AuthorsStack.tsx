import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Authors, Author } from '../components';
import { AuthorsStackParamList } from '../types';

const Stack = createNativeStackNavigator<AuthorsStackParamList>();

export const AuthorsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthorsList" component={Authors} />
      <Stack.Screen name="Author" component={Author} />
    </Stack.Navigator>
  );
};
