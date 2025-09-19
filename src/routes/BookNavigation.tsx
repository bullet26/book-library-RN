import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookDetail, BookMedia, BookPlot } from '../components';
import { BookStackParamList } from '../types';
import { colors } from '../theme';
import { UnmountOnBlur } from './unmount';

export const BookNavigation = () => {
  const BookStack = createNativeStackNavigator<BookStackParamList>();
  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1, paddingTop: 10 }}>
      <BookStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.backgroundAccent },
        }}
      >
        <BookStack.Screen
          name="BookDetail"
          component={BookDetail}
          layout={({ children }) => <UnmountOnBlur>{children}</UnmountOnBlur>}
        />
        <BookStack.Screen name="BookPlot" component={BookPlot} />
        <BookStack.Screen name="BookMedia" component={BookMedia} />
      </BookStack.Navigator>
    </SafeAreaView>
  );
};
