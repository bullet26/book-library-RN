import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { CardListBooks, CardListAuthors } from '../components';
import { themeContext } from '../theme';
import BookNavigation from './BookNavigation';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
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
        }}
      />
      <Tab.Screen
        name="Authors"
        component={CardListAuthors}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name={'user-pen'} light size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Book" // чтобы пробросить дочерний роут
        component={BookNavigation}
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
