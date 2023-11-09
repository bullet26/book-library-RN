import { FC, useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Book as IBook } from 'types';
import { Rating } from '../../UI';
import { SvgUri } from 'react-native-svg';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { themeContext } from '../../theme';

interface BookQuery {
  book: IBook;
}
type BookRouteProp = RouteProp<{ BookDetail: { id: string } }, 'BookDetail'>;

type CLNavigationProp = NavigationProp<
  {
    Book: {
      screen: 'BookPlot';
      params: { [id: string]: string };
    };
  },
  'Book'
>;

const BookDetail: FC<{ route: BookRouteProp; navigation: CLNavigationProp }> = ({
  route,
  navigation,
}) => {
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

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookPlot',
      params: { id },
    });
  };

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      <SafeAreaView style={{ backgroundColor: colors.backgroundAccent }}>
        <ScrollView>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            {!!bookCover ? (
              <Image
                source={{ uri: bookCover }}
                style={{
                  width: 250,
                  height: 415,
                }}
              />
            ) : (
              <SvgUri
                width="180px"
                height="315px"
                uri="https://res.cloudinary.com/dlyawnfbk/image/upload/v1698343659/book-cover_ijn21c.svg"
              />
            )}
          </View>
          <Text style={{ marginTop: 15, fontSize: 30, textAlign: 'center' }}>
            {data?.book.title}
          </Text>
          <Rating rating={data?.book.rating || 0} />
          <Text style={{ marginTop: 10 }}>author</Text>
          <Text>
            {data?.book.author.name} {data?.book.author.surname}
          </Text>
          <Text style={{ marginTop: 10 }}>read date</Text>
          <Text>
            {readEnd.day} {readEnd.month}, {readEnd.year}
          </Text>
          <View style={{ marginTop: 10 }}>{description}</View>

          <TouchableWithoutFeedback onPress={() => handleClick(data?.book?.id || '')}>
            <Text style={{ marginVertical: 20, fontSize: 25 }}>Read book plot...</Text>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BookDetail;
