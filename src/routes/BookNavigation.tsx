import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookDetail, BookMedia, BookPlot } from '../components';
import { BookStackParamList } from '../types';
import { colors } from '../theme';

export const BookNavigation = () => {
  const BookStack = createNativeStackNavigator<BookStackParamList>();
  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1, paddingTop: 10 }}>
      <BookStack.Navigator>
        <BookStack.Screen
          name="BookDetail"
          component={BookDetail}
          options={{ headerShown: false }}
        />
        <BookStack.Screen name="BookPlot" component={BookPlot} options={{ headerShown: false }} />
        <BookStack.Screen name="BookMedia" component={BookMedia} options={{ headerShown: false }} />
      </BookStack.Navigator>
    </SafeAreaView>
  );
};
