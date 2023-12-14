import { Button, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BooksByDateProps } from './type';

const Header = () => {
  const navigation = useNavigation<BooksByDateProps>();

  const handleChange = () => {
    navigation.navigate('BookBySpecificDate');
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        backgroundColor: '#000',
      }}
    >
      <Button title="Books by year" color="#000" onPress={handleChange} />
      <TextInput
        placeholder="Type here to search"
        onChangeText={(newText) => console.log(newText)}
      />
    </View>
  );
};

export default Header;
