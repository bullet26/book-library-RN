// eslint-disable-next-line import/no-extraneous-dependencies
import { AllMediaForItem, Author, ReadDateBook, Series } from 'types';

export interface Book {
  id: string;
  authorID?: string;
  author: Author;
  title: string;
  rating: number;
  seriesID?: string;
  series?: Series;
  seriesNumber?: number;
  tags: Tag[];
  pages: number;
  notes?: string;
  description?: string;
  readDate?: ReadDateBook[];
  bookCover: string;
  bookCoverThumbnail: string;
  isAdditionalMediaExist: boolean;
  additionalMedia: AllMediaForItem;
}

export interface Tag {
  id: string;
  tag: string;
  booksInTag: Book[];
}
