import { useState, useEffect, useRef } from 'react';
import { TextInput, View } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_IN_BOOKS_AND_AUTHORS } from '../../graphQL';
import { useNavigation } from '@react-navigation/native';
import Selector from 'react-native-select-dropdown';
import SelectDropdown from 'react-native-select-dropdown';
import type { ISearchSuccess, ToBookPage, ToAuthorPage } from './type';
import { checkTypesTitle, checkTypesRoute } from './utils';

export const Search = () => {
  const [makeSearch, { error, data }] = useLazyQuery<ISearchSuccess>(SEARCH_IN_BOOKS_AND_AUTHORS);
  const [showSearchList, setShowSearchListStatus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchListData, setSearchListData] = useState<string[]>([]);
  const selectorRef = useRef<SelectDropdown>(null);

  const navigationToBook = useNavigation<ToBookPage>();
  const navigationToAuthor = useNavigation<ToAuthorPage>();

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSearch = (searchString: string) => {
    makeSearch({ variables: { searchString } });
    setShowSearchListStatus(true);
  };

  const handleSearchResultClick = (selectedItem: string, index: number) => {
    const targetElement = data?.search[index];
    if (!targetElement) {
      return;
    }

    const { id } = targetElement;
    const parent = checkTypesRoute(targetElement);

    if (!!id && parent === 'books') {
      console.log('books');
      navigationToBook.navigate('Book', {
        screen: 'BookDetail',
        params: { id },
      });
    } else if (!!id && parent === 'authors') {
      console.log('authors');
      navigationToAuthor.navigate('Author', { id });
    }
    setShowSearchListStatus(false);
    setInputValue('');
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue) {
        handleSearch(inputValue);
      }
    }, 800);
    return () => clearInterval(debounce);
  }, [inputValue]);

  useEffect(() => {
    if (!!data?.search.length) {
      setSearchListData(
        data?.search.map((item) => {
          return checkTypesTitle(item);
        })
      );
      setTimeout(() => selectorRef.current?.openDropdown());
    } else {
      setSearchListData(["Couldn't find anything"]);
    }
  }, [data]);

  return (
    <View style={{ zIndex: 2 }}>
      {!showSearchList && (
        <TextInput
          placeholder="Type here to search"
          value={inputValue}
          onChangeText={(newText) => handleInputChange(newText)}
        />
      )}

      {!!data && showSearchList && (
        <Selector
          defaultButtonText={inputValue}
          data={searchListData}
          onSelect={(selectedItem, index) => handleSearchResultClick(selectedItem, index)}
          onBlur={() => setShowSearchListStatus(false)}
          dropdownStyle={{ backgroundColor: '#000' }}
          buttonStyle={{ backgroundColor: '#000' }}
          ref={selectorRef}
        />
      )}
    </View>
  );
};
