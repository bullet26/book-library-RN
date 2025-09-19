import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  CardListBooks,
  CardListAuthors,
  Author,
  BooksByDate,
  BooksByTag,
  CardListMostRededAuthors,
} from '../components';
import { colors } from '../theme';
import { BookNavigation } from './BookNavigation';
import { RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();

  return (
    <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Books"
        screenOptions={{
          tabBarActiveBackgroundColor: colors.backgroundAccent,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveBackgroundColor: colors.backgroundMain,
          tabBarInactiveTintColor: colors.textWhite,
          headerStyle: { backgroundColor: colors.backgroundAccent },
          headerTintColor: colors.textWhite,
        }}
      >
        <Tab.Screen
          name="Books"
          component={CardListBooks}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="book" iconStyle="solid" size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Authors"
          component={CardListAuthors}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="user-pen" iconStyle="solid" size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Book" // чтобы пробросить дочерний роут
          component={BookNavigation}
          options={{
            tabBarItemStyle: { display: 'none' },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="BookBySpecificDate" // чтобы пробросить дочерний роут
          component={BooksByDate}
          options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Tab.Screen
          name="BookByTag" // чтобы пробросить дочерний роут
          component={BooksByTag}
          options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Tab.Screen
          name="Author" // чтобы пробросить дочерний роут
          component={Author}
          options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
        />
        <Tab.Screen
          name="MostRededAuthors" // чтобы пробросить дочерний роут
          component={CardListMostRededAuthors}
          options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
