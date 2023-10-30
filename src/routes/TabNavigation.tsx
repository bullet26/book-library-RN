import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { CardListBooks, CardListAuthors } from '../components';
import { themeContext } from '../theme';
import { View } from 'react-native';
import BookNavigation from './BookNavigation';

function EmptyScreen() {
  return <View />;
}

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const colors = useContext(themeContext);

  const Stack = createNativeStackNavigator();

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
      <Tab.Screen name="Books" component={CardListBooks} />
      <Tab.Screen name="Authors" component={CardListAuthors} />
      <Tab.Screen
        name="Book" // чтобы пробросить дочерний роут
        component={BookNavigation}
        options={{ tabBarItemStyle: { display: 'none' }, headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
