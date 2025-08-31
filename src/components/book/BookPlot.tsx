import {
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import RenderHtml from 'react-native-render-html';
import { ONE_BOOK_PLOT } from '../../graphQL';
import { colors } from '../../theme';
import { BookPlotQuery, BookPlotProps } from './type';

export const BookPlot = ({ route, navigation }: BookPlotProps) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery<BookPlotQuery>(ONE_BOOK_PLOT, {
    variables: { bookID: id },
  });

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
          <ScrollView style={{ marginTop: 5, paddingHorizontal: 10 }}>
            <RenderHtml
              contentWidth={width}
              source={{
                html: data?.book?.plot,
              }}
            />
            <Pressable
              key={Math.random()}
              onPress={() => handleClick(id || '')}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? colors.backgroundMain : '',
                  paddingVertical: 10,
                  marginVertical: 10,
                },
              ]}
            >
              <Text style={{ fontSize: 25 }}>Return to book info...</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
