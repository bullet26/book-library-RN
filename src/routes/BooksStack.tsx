import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookDetail, BookMedia, BookPlot, Books, BooksByYear } from '../components';
import { colors } from '../theme';
import { BooksStackParamList } from '../types';

const Stack = createNativeStackNavigator<BooksStackParamList>();

export const BooksStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="BooksList"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.backgroundAccent, paddingTop: 10 },
      }}
    >
      <Stack.Screen name="BooksList" component={Books} />
      <Stack.Screen name="BooksListByYear" component={BooksByYear} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
      <Stack.Screen name="BookPlot" component={BookPlot} />
      <Stack.Screen name="BookMedia" component={BookMedia} />
    </Stack.Navigator>
  );
};
