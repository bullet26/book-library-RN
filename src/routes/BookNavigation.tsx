import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookDetail, BookPlot } from '../components';
import { FC } from 'react';

const BookNavigation: FC = () => {
  const BookStack = createNativeStackNavigator();

  return (
    <BookStack.Navigator>
      <BookStack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
      <BookStack.Screen name="BookPlot" component={BookPlot} options={{ headerShown: false }} />
    </BookStack.Navigator>
  );
};

export default BookNavigation;
