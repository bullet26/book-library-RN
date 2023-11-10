import { FC, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { ONE_BOOK_PLOT } from '../../graphQL';
import { themeContext } from '../../theme';
import { BookPlotQuery, BookPlotProps } from './type';

const BookPlot: FC<BookPlotProps> = ({ route, navigation }) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookPlotQuery>(ONE_BOOK_PLOT, {
    variables: { bookID: id },
  });
  const [plot, setPlot] = useState('add plot someday');

  const colors = useContext(themeContext);

  const handleClick = (id: string) => {
    navigation.navigate('BookDetail', { id });
  };

  useEffect(() => {
    if (!!data?.book?.plot) {
      const paragraphs = data?.book?.plot.replace(/<\/br>|<br\/>/g, '\n');

      setPlot(paragraphs);
    }
  }, [data]);

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      {!!data && (
        <SafeAreaView style={{ backgroundColor: colors.backgroundAccent, flex: 1 }}>
          <ScrollView>
            <Text style={{ marginVertical: 10, marginLeft: 10, marginRight: 5 }}>{plot}</Text>
            <TouchableWithoutFeedback onPress={() => handleClick(id || '')}>
              <Text style={{ marginVertical: 20, fontSize: 25 }}>Return to book info...</Text>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default BookPlot;
