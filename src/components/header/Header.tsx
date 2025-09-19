import { Button, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search } from './Search';
import { BooksByDateProps } from './type';

export const Header = () => {
  const navigation = useNavigation<BooksByDateProps>();

  const handleChange = () => {
    navigation.navigate('BookBySpecificDate', { year: new Date().getFullYear().toString() });
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        backgroundColor: '#000',
        zIndex: 2,
      }}
    >
      <Button title="Books by year" color="#000000" onPress={handleChange} />
      <Search />
    </View>
  );
};
