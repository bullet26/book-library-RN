import { FC, useContext } from 'react';
import { SectionList, FlatList, Text } from 'react-native';
import { ImageCard } from '../../UI';
import { CardListBooksByDateProps } from './type';
import { themeContext } from '../../theme';
import { styles } from './style';

export const CardListBooksByDate: FC<CardListBooksByDateProps> = (props) => {
  const { handleClickBook, year, booksData } = props;

  const colors = useContext(themeContext);

  return (
    <SectionList
      sections={booksData}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item }) => (
        <FlatList
          data={item.books}
          numColumns={3}
          horizontal={false}
          columnWrapperStyle={{ marginVertical: 12, marginLeft: 20 }}
          renderItem={({ item }) => (
            <ImageCard
              uri={item.books.bookCover}
              width={100}
              height={162}
              style={{ marginRight: 5, marginLeft: 10 }}
              id={item.books.id}
              handleClick={() => handleClickBook(item.books.id)}
            />
          )}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={[
            styles.title,
            { backgroundColor: colors.lighterBGC, color: colors.fontDividerColor },
          ]}
        >
          &nbsp;&nbsp;{title}&nbsp;&nbsp;
        </Text>
      )}
      ListHeaderComponent={() => <Text style={styles.mainTitle}>{year}</Text>}
    />
  );
};
