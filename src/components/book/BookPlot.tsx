import { FC, useContext } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import RenderHtml from 'react-native-render-html';
import { ONE_BOOK_PLOT } from '../../graphQL';
import { themeContext } from '../../theme';
import { BookPlotQuery, BookPlotProps } from './type';

const BookPlot: FC<BookPlotProps> = ({ route, navigation }) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookPlotQuery>(ONE_BOOK_PLOT, {
    variables: { bookID: id },
  });

  const colors = useContext(themeContext);

  const handleClick = (id: string) => {
    navigation.navigate('BookDetail', { id });
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
          <ScrollView style={{ marginTop: 5, marginHorizontal: 10 }}>
            <RenderHtml
              contentWidth={width}
              source={{
                html: data?.book?.plot,
              }}
            />
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
