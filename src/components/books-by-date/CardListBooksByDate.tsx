import { FC, useContext } from 'react';
import { SectionList, FlatList, Text, View } from 'react-native';
import { ImageCard, Rating } from '../../UI';
import { CardListBooksByDateProps } from './type';
import { colors } from '../../theme';
import { styles } from './style';

export const CardListBooksByDate: FC<CardListBooksByDateProps> = (props) => {
  const { handleClickBook, year, booksData } = props;

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
            <View>
              <ImageCard
                uri={item.books.bookCoverThumbnail}
                width={100}
                height={162}
                style={{ marginRight: 5, marginLeft: 10 }}
                id={item.books.id}
                handleClick={() => handleClickBook(item.books.id)}
                title={item.books.title}
              />
              <Rating rating={item.books.rating || 0} type="circle-only" />
            </View>
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
