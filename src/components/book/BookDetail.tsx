import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { ImageCard, ImageCarousel, Rating } from '../../UI';
import { colors } from '../../theme';
import { useBookDetail } from './hook/useBook';
import { styles } from './styles';

export const BookDetail = () => {
  const {
    loading,
    book,
    bookCover,
    goToBookPlot,
    goToBookMedia,
    goToAuthor,
    goToAnotherBook,
    goToBooksByYear,
    handleClickTag,
  } = useBookDetail();

  const { width } = useWindowDimensions();

  if (loading) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    !!book && (
      <SafeAreaView edges={['top']} style={styles.wrapper}>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          <View
            style={[
              styles.bookInfoWRapper,
              { justifyContent: book.isAdditionalMediaExist ? 'flex-end' : 'center' },
            ]}
          >
            <ImageCard uri={bookCover} width={250} height={415} />
            {book.isAdditionalMediaExist && (
              <TouchableOpacity
                onPress={goToBookMedia}
                activeOpacity={0.7}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 7,
                }}
              >
                <FontAwesome6 name={'image'} iconStyle="solid" size={30} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={{ marginTop: 15, fontSize: 30, textAlign: 'center', color: colors.textMain }}
          >
            {book.title}
          </Text>
          <Rating rating={book.rating || 0} type="star" />
          <TouchableOpacity
            onPress={() => goToAuthor(book.author.id || '')}
            activeOpacity={0.7}
            style={{
              paddingVertical: 5,
              marginTop: 5,
            }}
          >
            <View>
              <Text style={{ color: colors.textAccent }}>author</Text>
              <Text style={{ color: colors.textAccent }}>
                {book.author.name} {book.author.surname}
              </Text>
            </View>
          </TouchableOpacity>
          {book.readDate?.map(({ readEnd }, i) => (
            <TouchableOpacity
              key={i.toString()}
              activeOpacity={0.7}
              onPress={() => goToBooksByYear(readEnd.year || '')}
              style={{ paddingVertical: 5 }}
            >
              <Text style={{ color: colors.textAccent }}>read date</Text>
              <Text style={{ color: colors.textAccent }}>
                {readEnd.day} {readEnd.month}, {readEnd.year}
              </Text>
            </TouchableOpacity>
          ))}

          <View style={{ marginTop: 10 }}>
            <RenderHtml
              contentWidth={width}
              tagsStyles={{ body: { color: colors.textAccent } }}
              source={{
                html: book.description || 'Add annotation someday',
              }}
            />
          </View>

          <View style={styles.tagContainer}>
            {book.tags.map(item => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => handleClickTag(item.id)}
                style={styles.tag}
              >
                <Text style={styles.tagText}>#{item.tag}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {book.series && (
            <ImageCarousel
              data={book.series.booksInSeries}
              title={book.series.title}
              handleClick={goToAnotherBook}
            />
          )}
          <TouchableOpacity style={styles.triggerButton} onPress={goToBookPlot} activeOpacity={0.8}>
            <Text style={styles.triggerText}>Read book plot...</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  );
};
