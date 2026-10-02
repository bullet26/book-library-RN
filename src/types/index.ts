import { NavigatorScreenParams } from '@react-navigation/native';
import type { GetBooksQuery, GetOneAuthorByIdQuery } from '../graphQL/__generated__/graphql';

export type BooksStackParamList = {
  BooksList: BooksFilterParams | undefined;
  BookDetail: { id: string };
  BookPlot: { id: string };
  BookMedia: { id: string };
  BooksListByYear: { year: string };
};

export type BooksFilterParams = {
  tagId?: string;
  rating?: string;
  year?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
};

export type AuthorsStackParamList = {
  AuthorsList: { page?: number; limit?: number; sortBy?: string } | undefined;
  Author: { id: string };
};

export type TabParamList = {
  BooksTab: NavigatorScreenParams<BooksStackParamList> | undefined;
  AuthorsTab: NavigatorScreenParams<AuthorsStackParamList> | undefined;
};

export type AllBooks = NonNullable<GetBooksQuery['getBooks']>['books'];

export type SerieBooks = NonNullable<GetOneAuthorByIdQuery['author']>['series'][number];
