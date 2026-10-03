import { useState, useEffect } from 'react';
import { TextInput, View, FlatList, Text, Pressable } from 'react-native';
import { useLazyQuery } from '@apollo/client/react';
import { SEARCH_IN_BOOKS_AND_AUTHORS } from '../../graphQL';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';
import { styles } from './styles';

import type { ToBookPage, ToAuthorPage } from './type';
import { checkTypesTitle } from './utils';
import { useDebounce } from '../../hooks';

export const Search = () => {
  const [makeSearch, { data }] = useLazyQuery(SEARCH_IN_BOOKS_AND_AUTHORS);
  const [showSearchListStatus, setShowSearchListStatus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 800);
  const [searchListData, setSearchListData] = useState<
    { id: string; type: string; title: string }[]
  >([]);

  const navigationToBook = useNavigation<ToBookPage>();
  const navigationToAuthor = useNavigation<ToAuthorPage>();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearchResultClick = (id: string, type: string) => {
    if (!!id && type === 'books') {
      console.log('books');
      navigationToBook.navigate('BooksTab', {
        screen: 'BookDetail',
        params: { id },
      });
    } else if (!!id && type === 'authors') {
      console.log('authors');
      navigationToAuthor.navigate('AuthorsTab', { screen: 'Author', params: { id } });
    }
    setShowSearchListStatus(false);
    setInputValue('');
  };

  useEffect(() => {
    if (debouncedValue) {
      makeSearch({ variables: { searchString: debouncedValue } });
      setShowSearchListStatus(true);
    } else {
      setShowSearchListStatus(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (data?.search?.length) {
      setSearchListData(
        data?.search.map(item => {
          return checkTypesTitle(item);
        }),
      );
    } else {
      setSearchListData([{ id: '', type: '', title: "Couldn't find anything" }]);
    }
  }, [data]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Type here to search"
        value={inputValue}
        onChangeText={newText => handleInputChange(newText)}
        style={styles.input}
      />

      {!!data && showSearchListStatus && (
        <FlatList
          style={styles.resultList}
          data={searchListData}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderColor: pressed ? colors.backgroundMain : colors.textWhite,
                  opacity: pressed ? 0.5 : 1,
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                handleSearchResultClick(item.id, item.type);
              }}
            >
              <Text style={styles.text}>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};
