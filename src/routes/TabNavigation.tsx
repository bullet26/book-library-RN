import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { CardListBooks, CardListAuthors, Author, BooksByDate } from '../components';
import { themeContext } from '../theme';
import BookNavigation from './BookNavigation';
import { RootStackParamList } from 'types';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator<RootStackParamList>();
  const colors = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName="Books"
      screenOptions={{
        tabBarActiveBackgroundColor: colors.backgroundAccent,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.backgroundMain,
        tabBarInactiveTintColor: colors.textInactive,
        headerStyle: { backgroundColor: colors.backgroundAccent },
        headerTintColor: colors.textInactive,
      }}
    >
      <Tab.Screen
        name="Books"
        component={CardListBooks}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome6 name={'book'} thin size={20} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Authors"
        component={CardListAuthors}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={'user-pen'} light size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Book" // чтобы пробросить дочерний роут
        component={BookNavigation}
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Tab.Screen
        name="BookBySpecificDate" // чтобы пробросить дочерний роут
        component={BooksByDate}
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
      <Tab.Screen
        name="Author" // чтобы пробросить дочерний роут
        component={Author}
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
