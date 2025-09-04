import { useState, useEffect } from 'react';
import { TextInput, View, FlatList, Text, Pressable } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_IN_BOOKS_AND_AUTHORS } from '../../graphQL';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme';

import type { ISearchSuccess, ToBookPage, ToAuthorPage } from './type';
import { checkTypesTitle } from './utils';
import { useDebounce } from 'hooks/useDebounce';

export const Search = () => {
  const [makeSearch, { error, data }] = useLazyQuery<ISearchSuccess>(SEARCH_IN_BOOKS_AND_AUTHORS);
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

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString } });
    setShowSearchListStatus(true);
  };

  const handleSearchResultClick = (id: string, type: string) => {
    if (!!id && type === 'books') {
      console.log('books');
      navigationToBook.navigate('Book', {
        screen: 'BookDetail',
        params: { id },
      });
    } else if (!!id && type === 'authors') {
      console.log('authors');
      navigationToAuthor.navigate('Author', { id });
    }
    setShowSearchListStatus(false);
    setInputValue('');
  };

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!!data?.search.length) {
      setSearchListData(
        data?.search.map((item) => {
          return checkTypesTitle(item);
        })
      );
    } else {
      setSearchListData([{ id: '', type: '', title: "Couldn't find anything" }]);
    }
  }, [data]);

  return (
    <View style={{ width: '50%' }}>
      <TextInput
        placeholder="Type here to search"
        value={inputValue}
        onChangeText={(newText) => handleInputChange(newText)}
      />

      {!!data && showSearchListStatus && (
        <FlatList
          style={{ position: 'absolute', top: 45, backgroundColor: colors.dark }}
          data={searchListData}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                {
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderColor: pressed ? colors.backgroundMain : colors.textInactive,
                  opacity: pressed ? 0.5 : 1,
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                handleSearchResultClick(item.id, item.type);
              }}
            >
              <Text style={{ fontSize: 18 }}>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};
