import { useState, useEffect, FC, useRef } from 'react';
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
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { ImageCard, ImageCarousel, Rating } from '../../UI';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { colors } from '../../theme';
import { BookQuery, BookDetailProps } from './type';

const BookDetail: FC<BookDetailProps> = ({ route, navigation }) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } });
  const [bookCover, setBookCover] = useState('');
  const pressedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!!data) {
      setBookCover(data.book.bookCover);
    }
  }, [data]);

  const handleClickPlot = () => {
    navigation.navigate('BookPlot', { id });
  };

  const handleClickMedia = () => {
    navigation.navigate('BookMedia', { id });
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
          <ScrollView style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                justifyContent: data?.book.isAdditionalMediaExist ? 'flex-end' : 'center',
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
                marginTop: 10,
              }}
            >
              <ImageCard uri={bookCover} width={250} height={415} />
              {data?.book.isAdditionalMediaExist && (
                <Pressable
                  onPress={handleClickMedia}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? colors.backgroundMain : '',
                      paddingVertical: 5,
                      paddingHorizontal: 7,
                    },
                  ]}
                >
                  <FontAwesome6 name={'image'} solid size={30} color={colors.primary} />
                </Pressable>
              )}
            </View>
            <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center' }}>
              {data?.book.title}
            </Text>
            <Rating rating={data?.book.rating || 0} type="star" />
            <Pressable
              key={Math.random()}
              onPress={() => handleClickAuthor(data.book.author.id || '')}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.backgroundMain : '',
                  paddingVertical: 5,
                  marginTop: 5,
                },
              ]}
            >
              <View>
                <Text>author</Text>
                <Text>
                  {data?.book.author.name} {data?.book.author.surname}
                </Text>
              </View>
            </Pressable>
            {data?.book?.readDate?.map(({ readEnd }, i) => (
              <Pressable
                key={i.toString()}
                onPress={() => handleClickDate(readEnd.year || '')}
                onPressIn={() => {
                  pressedIndexRef.current = i;
                }}
                onPressOut={() => {
                  setTimeout(() => (pressedIndexRef.current = null), 500);
                }}
                style={{
                  backgroundColor: pressedIndexRef.current === i ? colors.backgroundMain : '',
                  paddingVertical: 5,
                }}
              >
                <Text>read date</Text>
                <Text>
                  {readEnd.day} {readEnd.month}, {readEnd.year}
                </Text>
              </Pressable>
            ))}

            <View style={{ marginTop: 10 }}>
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
            {!!data?.book?.series && (
              <ImageCarousel
                data={data?.book.series.booksInSeries}
                title={data?.book.series.title}
              />
            )}
            <Pressable
              onPress={handleClickPlot}
              key={Math.random()}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.backgroundMain : '',
                  paddingVertical: 10,
                  marginVertical: 10,
                },
              ]}
            >
              <Text style={{ fontSize: 25 }}>Read book plot...</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default BookDetail;
