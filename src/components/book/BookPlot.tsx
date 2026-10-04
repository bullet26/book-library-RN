import {
  ActivityIndicator,
  Text,
  ScrollView,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';
import { colors } from '../../theme';
import { styles } from './styles';
import { useBookPlot } from './hook/useBook';

export const BookPlot = () => {
  const { loading, data, goToBookDetail } = useBookPlot();

  const { width } = useWindowDimensions();

  const htmlContent = useMemo(() => {
    const html = data?.book?.plot;

    if (!html) return '<h2>No plot available</h2>';

    return html
      .replace(/<div[^>]*>\s*(<br\s*\/?>)?\s*<\/div>/gi, '')
      .replace(/<div/gi, '<p')
      .replace(/<\/div>/gi, '</p>');
  }, [data?.book?.plot]);

  if (loading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) return null;

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <ScrollView style={{ marginTop: 5, paddingHorizontal: 10 }}>
        <RenderHtml
          tagsStyles={{
            body: { color: colors.textAccent },
            b: { fontWeight: 'bold' },
            strong: { fontWeight: 'bold' },
            em: { fontStyle: 'italic' },
            p: { marginBottom: 10 },
          }}
          contentWidth={width}
          enableCSSInlineProcessing={true}
          source={{
            html: htmlContent,
          }}
        />
        <TouchableOpacity style={styles.triggerButton} onPress={goToBookDetail} activeOpacity={0.8}>
          <Text style={styles.triggerText}>Return to book info...</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
