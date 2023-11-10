import { useContext, useState, useEffect, FC } from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ImageCard, Rating } from '../../UI';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { themeContext } from '../../theme';
import { BookQuery, BookDetailProps } from './type';

const BookDetail: FC<BookDetailProps> = ({ route, navigation }) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } });
  const [bookCover, setBookCover] = useState('');
  const [description, setDescription] = useState<React.JSX.Element[]>();

  const [readEnd, setReadEnd] = useState({ day: '', month: '', year: '' });

  useEffect(() => {
    if (!!data) {
      setBookCover(data.book.bookCover);
    }

    if (!!data?.book?.description) {
      const paragraphs = data?.book?.description
        .split('<br>')
        .map((paragraph, index) => <Text key={index}>{paragraph}</Text>);
      setDescription(paragraphs);
    }

    if (!!data?.book?.readDate?.length) {
      const [{ readEnd }] = data?.book?.readDate;
      setReadEnd(readEnd);
    }
  }, [data]);

  const colors = useContext(themeContext);

  const handleClickPlot = (id: string) => {
    navigation.navigate('BookPlot', { id });
  };

  const handleClickAuthor = (id: string) => {
    // TODO route
    console.log('handleClickAuthor', id);
  };

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      {!!data && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
          <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <ImageCard uri={bookCover} width={250} height={415} />
            </View>
            <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center' }}>
              {data?.book.title}
            </Text>
            <Rating rating={data?.book.rating || 0} />
            <TouchableWithoutFeedback onPress={() => handleClickAuthor(data.book.author.id || '')}>
              <View>
                <Text style={{ marginTop: 10, marginHorizontal: 10 }}>author</Text>
                <Text style={{ marginHorizontal: 10 }}>
                  {data?.book.author.name} {data?.book.author.surname}
                </Text>
              </View>
            </TouchableWithoutFeedback>

            <Text style={{ marginTop: 10, marginHorizontal: 10 }}>read date</Text>
            <Text style={{ marginHorizontal: 10 }}>
              {readEnd.day} {readEnd.month}, {readEnd.year}
            </Text>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>{description}</View>

            <TouchableWithoutFeedback onPress={() => handleClickPlot(id || '')}>
              <Text style={{ marginVertical: 20, marginHorizontal: 10, fontSize: 25 }}>
                Read book plot...
              </Text>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default BookDetail;
