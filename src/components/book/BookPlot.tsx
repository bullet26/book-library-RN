import {
  Pressable,
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useQuery } from '@apollo/client/react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import { ONE_BOOK_PLOT } from '../../graphQL';
import { colors } from '../../theme';
import { BookPlotProps } from './type';

export const BookPlot = ({ route, navigation }: BookPlotProps) => {
  const { id } = route?.params;

  const { loading, error, data } = useQuery(ONE_BOOK_PLOT, {
    skip: !id,
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
              tagsStyles={{ body: { color: colors.textAccent } }}
              contentWidth={width}
              source={{
                html: data?.book?.plot || '<div><h2>No plot available</h2></div>',
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
              <Text style={{ fontSize: 25, color: colors.textMain }}>Return to book info...</Text>
            </Pressable>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};
