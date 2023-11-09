import { FC, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Plot } from 'types';
import { ONE_BOOK_PLOT } from '../../graphQL';
import { themeContext } from '../../theme';

interface BookQuery {
  book: Plot;
}
type CLNavigationProp = NavigationProp<
  {
    Book: {
      screen: 'BookDetail';
      params: { [id: string]: string };
    };
  },
  'Book'
>;
type BookRouteProp = RouteProp<{ BookPlot: { id: string } }, 'BookPlot'>;

const BookPlot: FC<{ route: BookRouteProp; navigation: CLNavigationProp }> = ({
  route,
  navigation,
}) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_PLOT, { variables: { id } });
  const [plot, setPlot] = useState<React.JSX.Element[]>();

  const colors = useContext(themeContext);

  const handleClick = (id: string) => {
    navigation.navigate('Book', {
      screen: 'BookDetail',
      params: { id },
    });
  };

  useEffect(() => {
    if (!!data?.book?.plot) {
      const paragraphs = data?.book?.plot
        .split('<br>')
        .map((paragraph, index) => <Text key={index}>{paragraph}</Text>);
      setPlot(paragraphs);
    }
  }, [data]);

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      <SafeAreaView style={{ backgroundColor: colors.backgroundAccent }}>
        <View>{id}</View>
        <ScrollView>{plot}</ScrollView>
        <TouchableWithoutFeedback onPress={() => handleClick(data?.book.bookID || '')}>
          <Text style={{ marginVertical: 20, fontSize: 25 }}>Return to book info...</Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </>
  );
};

export default BookPlot;
