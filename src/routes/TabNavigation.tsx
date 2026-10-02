import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { colors } from '../theme';
import { TabParamList } from '../types';
import { AuthorsStack } from './AuthorsStack';
import { BooksStack } from './BooksStack';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="BooksTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: colors.backgroundAccent,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveBackgroundColor: colors.backgroundMain,
        tabBarInactiveTintColor: colors.textWhite,
        headerStyle: { backgroundColor: colors.backgroundAccent },
        headerTintColor: colors.textWhite,
        tabBarStyle: {
          backgroundColor: colors.backgroundMain,
        },
      }}
    >
      <Tab.Screen
        name="BooksTab"
        component={BooksStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book" iconStyle="solid" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AuthorsTab"
        component={AuthorsStack}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user-pen" iconStyle="solid" size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
