import { useContext, useState, useEffect, FC } from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Button,
} from 'react-native';
import { useQuery } from '@apollo/client';
import RenderHtml from 'react-native-render-html';
import { ImageCard, Rating } from '../../UI';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { themeContext } from '../../theme';
import { BookQuery, BookDetailProps } from './type';

const BookDetail: FC<BookDetailProps> = ({ route, navigation }) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } });
  const [bookCover, setBookCover] = useState('');

  useEffect(() => {
    if (!!data) {
      setBookCover(data.book.bookCover);
    }
  }, [data]);

  const colors = useContext(themeContext);

  const handleClickPlot = (id: string) => {
    navigation.navigate('BookPlot', { id });
  };

  const handleClickAuthor = (id: string) => {
    navigation.navigate('Author', { id });
  };

  const handleClickDate = (year: string) => {
    navigation.navigate('BookBySpecificDate', { year });
  };

  const handleClickTag = (id: string) => {
    navigation.navigate('BookByTag', { id });
  };

  const { width } = useWindowDimensions();

  return (
    <>
      {!!loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: colors.backgroundMain,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      {!!data && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
          <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <ImageCard uri={bookCover} width={250} height={415} />
            </View>
            <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center' }}>
              {data?.book.title}
            </Text>
            <Rating rating={data?.book.rating || 0} type="star" />
            <Pressable onPress={() => handleClickAuthor(data.book.author.id || '')}>
              <View>
                <Text style={{ marginTop: 10, marginHorizontal: 10 }}>author</Text>
                <Text style={{ marginHorizontal: 10 }}>
                  {data?.book.author.name} {data?.book.author.surname}
                </Text>
              </View>
            </Pressable>
            <Text style={{ marginTop: 10, marginHorizontal: 10 }}>read date</Text>
            {data?.book?.readDate?.map(({ readEnd }, i) => (
              <Pressable key={i.toString()} onPress={() => handleClickDate(readEnd.year || '')}>
                <Text style={{ marginHorizontal: 10, marginBottom: 10 }}>
                  {readEnd.day} {readEnd.month}, {readEnd.year}
                </Text>
              </Pressable>
            ))}

            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <RenderHtml
                contentWidth={width}
                source={{
                  html: data?.book?.description || 'Add annotation someday',
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 5,
                rowGap: 10,
                justifyContent: 'space-around',
                marginTop: 15,
                marginHorizontal: 10,
              }}
            >
              {data.book.tags.map((item) => (
                <Button
                  key={item.id}
                  title={item.tag}
                  color="purple"
                  onPress={() => {
                    handleClickTag(item.id);
                  }}
                />
              ))}
            </View>
            <Pressable onPress={() => handleClickPlot(id || '')}>
              <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 25 }}>
                Read book plot...
              </Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default BookDetail;
