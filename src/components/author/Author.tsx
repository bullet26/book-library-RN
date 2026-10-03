import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageCard, Rating } from '../../UI';
import { colors } from '../../theme';
import { SectionList, ActivityIndicator, Text, View, FlatList } from 'react-native';
import { colorRate } from '../../utils';
import { useAuthor } from './hook/useAuthor';
import { styles } from './styles';

export const Author = () => {
  const { author, handleClickBook, booksData, booksQuant, booksAverageRating, loading } =
    useAuthor();

  if (loading || !booksData.length) {
    return (
      <View style={styles.centeredLoader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.wrapper}>
      <SectionList
        sections={booksData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <FlatList
            data={item.booksData}
            numColumns={3}
            horizontal={false}
            scrollEnabled={false}
            columnWrapperStyle={{ marginBottom: 10, marginLeft: 20 }}
            keyExtractor={book => book.id}
            renderItem={({ item: book }) => (
              <View>
                <ImageCard
                  uri={book.bookCoverThumbnail}
                  width={100}
                  height={162}
                  style={{ marginRight: 5, marginLeft: 10 }}
                  id={book.id}
                  handleClick={handleClickBook}
                  title={book.title}
                />
                <Rating rating={book.rating || 0} type="circle-only" />
              </View>
            )}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ marginBottom: 15, color: colors.textMain }}>
            &nbsp;&nbsp;{title}&nbsp;&nbsp;
          </Text>
        )}
        ListHeaderComponent={() => (
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <ImageCard uri={author?.portrait || ''} width={250} height={415} />
            </View>
            <Text
              style={{
                marginTop: 15,
                fontSize: 30,
                textAlign: 'center',
                color: colors.textMain,
              }}
            >
              {author?.name || ''} {author?.surname || ''}
            </Text>
            <Text style={{ marginTop: 10, fontSize: 20, color: colors.textAccent }}>
              Total number of books read:&nbsp;{booksQuant || 'unknown'}
            </Text>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 15,
                fontSize: 20,
                color: colors.textAccent,
              }}
            >
              Average rating:&nbsp;
              <Text style={{ color: colorRate(booksAverageRating) }}>
                {booksAverageRating || 'unknown'}
              </Text>
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};
