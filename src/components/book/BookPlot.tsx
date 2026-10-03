import {
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import { colors } from '../../theme';
import { styles } from './styles';
import { useBookPlot } from './hook/useBook';

export const BookPlot = () => {
  const { loading, data, goToBookDetail } = useBookPlot();

  const { width } = useWindowDimensions();

  if (loading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    !!data && (
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <ScrollView style={{ marginTop: 5, paddingHorizontal: 10 }}>
          <RenderHtml
            tagsStyles={{
              body: { color: colors.textAccent },
              b: { fontWeight: 'bold' },
              strong: { fontWeight: 'bold' },
              em: { fontStyle: 'italic' },
            }}
            contentWidth={width}
            enableCSSInlineProcessing={true}
            source={{
              html: data?.book?.plot || '<div><h2>No plot available</h2></div>',
            }}
          />
          <TouchableOpacity
            style={styles.triggerButton}
            onPress={goToBookDetail}
            activeOpacity={0.8}
          >
            <Text style={styles.triggerText}>Return to book info...</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  );
};
