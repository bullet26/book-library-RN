import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text } from 'react-native';
import { ImageCard } from '../../UI';
import { GetOneBookIdQuery } from '../../graphQL/__generated__/graphql';
import { colors } from '../../theme';

const { width } = Dimensions.get('window');
const ITEMS_PER_PAGE = 3;
const ITEM_WIDTH = width / ITEMS_PER_PAGE;

interface ImageCarouselProps {
  title: string;
  data: NonNullable<NonNullable<GetOneBookIdQuery['book']>['series']>['booksInSeries'];
}

export const ImageCarousel = (props: ImageCarouselProps) => {
  const { data, title } = props;

  return (
    <View style={{ marginTop: 15 }}>
      <Text>
        <Text style={{ fontSize: 14, color: colors.textAccent }}>
          All books in the series:&nbsp;
        </Text>
        <Text style={{ fontSize: 18, color: colors.textMain }}>{title}</Text>
      </Text>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate="fast"
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <ImageCard
              uri={item.bookCoverThumbnail}
              width={ITEM_WIDTH - 10}
              height={200}
              title={item.title}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    objectFit: 'contain',
    width: '90%',
    height: 200,
    borderRadius: 10,
  },
});
