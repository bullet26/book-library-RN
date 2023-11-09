import { FC, useContext, useEffect, useState } from 'react';
import { SafeAreaView, Image, ActivityIndicator, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Book as IBook } from 'types';
import { Rating } from '../../UI';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { themeContext } from '../../theme';

interface BookQuery {
  book: IBook;
}
type BookRouteProp = RouteProp<{ BookDetail: { id: string } }, 'BookDetail'>;

const BookDetail: FC<{ route: BookRouteProp }> = ({ route }) => {
  const { id } = route?.params;
  console.log(id);

  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, { variables: { id } });
  const bookCover = data?.book.bookCover;
  const colors = useContext(themeContext);

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundAccent }}>
        <Text>{id}</Text>
        <Rating rating={data?.book.rating || 0} />

        {/* <View className={s.wrapperContent}>
          <View className={`${s.title} ${s.mobile}`}>{data?.book.title}</View>
          <View className={s.imgWrapper}>
            {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
            
          </View>
          <View className={s.contentWrapper}>
            <View className={s.title}>{data?.book.title}</div>
          </View>
        </View> */}
      </SafeAreaView>
    </>
  );
};

export default BookDetail;
