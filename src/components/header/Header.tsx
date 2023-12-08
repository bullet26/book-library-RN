import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BooksByDateProps } from './type';

const Header = () => {
  const navigation = useNavigation<BooksByDateProps>();

  const handleChange = () => {
    navigation.navigate('BookBySpecificDate');
  };
  return <Button title="Books by year" color="#000" onPress={handleChange} />;
};

export default Header;
