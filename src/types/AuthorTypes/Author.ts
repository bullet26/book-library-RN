import { Book, Series } from 'types';

export interface Author {
  id?: string;
  name: string;
  surname: string;
  portrait: string;
  portraitThumbnail: string;
  books: Book[];
  series: [Series];
  booksWithoutSeries: [Book];
}

export interface MostRededAuthorResponse {
  name: string;
  surname: string;
  id: string;
  portraitThumbnail: string;
  count: number;
}
