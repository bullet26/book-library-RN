import { FC, useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { Book as IBook } from 'types';
import { Rating } from 'UI';
import { ONE_BOOK_BY_ID } from '../../graphQL';
import { themeContext } from '../../theme';

interface BookQuery {
  book: IBook;
}

const BookPlot: FC = () => {
  const { loading, error, data } = useQuery<BookQuery>(ONE_BOOK_BY_ID, {});
  const bookCover = data?.book.bookCover;
  const colors = useContext(themeContext);

  return (
    <>
      {!!loading && <ActivityIndicator size="large" color={colors.primary} />}
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundAccent }}>
        {/* <div className={s.wrapperContent}>
            <div className={`${s.title} ${s.mobile}`}>{data?.book.title}</div>
            <div className={s.imgWrapper}>
              {bookCover ? <Image width="100%" src={bookCover} /> : <BookImg width="100%" />}
              <Rating rating={data?.book.rating || 0} />
            </div>
            <div className={s.contentWrapper}>
              <div className={s.title}>{data?.book.title}</div>
            </div>
          </div> */}
      </SafeAreaView>
    </>
  );
};

export default BookPlot;
