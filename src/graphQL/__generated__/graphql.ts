/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type AdditionalMedia = {
  __typename?: 'AdditionalMedia';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  type: MediaType;
  url: Scalars['String']['output'];
};

export type AdditionalMediaInput = {
  bookID: Scalars['ID']['input'];
  type: MediaType;
  url: Scalars['String']['input'];
};

export type AllMediaForItem = {
  __typename?: 'AllMediaForItem';
  image: Array<AdditionalMedia>;
  video: Array<AdditionalMedia>;
};

export type Author = {
  __typename?: 'Author';
  books: Array<Book>;
  booksWithoutSeries: Array<Book>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portrait?: Maybe<Scalars['String']['output']>;
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  series: Array<Series>;
  surname?: Maybe<Scalars['String']['output']>;
  transcriptionName?: Maybe<Scalars['String']['output']>;
};

export type AuthorInput = {
  name: Scalars['String']['input'];
  portrait?: InputMaybe<Scalars['String']['input']>;
  portraitThumbnail?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
  transcriptionName?: InputMaybe<Scalars['String']['input']>;
};

export type AuthorMostReadResponse = {
  __typename?: 'AuthorMostReadResponse';
  count: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  portraitThumbnail?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type AuthorResponse = {
  __typename?: 'AuthorResponse';
  authors: Array<Author>;
  totalCount: Scalars['Int']['output'];
};

export type AuthorsStatisticResponse = {
  __typename?: 'AuthorsStatisticResponse';
  count: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  surname: Scalars['String']['output'];
};

export type Book = {
  __typename?: 'Book';
  additionalMedia?: Maybe<AllMediaForItem>;
  author: Author;
  authorID: Scalars['ID']['output'];
  bookCover?: Maybe<Scalars['String']['output']>;
  bookCoverThumbnail?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isAdditionalMediaExist: Scalars['Boolean']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Scalars['Int']['output']>;
  rating?: Maybe<Scalars['Float']['output']>;
  readDate: Array<ReadDate>;
  series?: Maybe<Series>;
  seriesID?: Maybe<Scalars['ID']['output']>;
  seriesNumber?: Maybe<Scalars['Int']['output']>;
  tags: Array<Tags>;
  title: Scalars['String']['output'];
};

export type BookInput = {
  authorID: Scalars['ID']['input'];
  bookCover?: InputMaybe<Scalars['String']['input']>;
  bookCoverThumbnail?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Scalars['Int']['input']>;
  plot?: InputMaybe<Scalars['String']['input']>;
  rating?: InputMaybe<Scalars['Float']['input']>;
  readEnd: Scalars['Date']['input'];
  seriesID?: InputMaybe<Scalars['ID']['input']>;
  seriesNumber?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type BookPlotInput = {
  bookID: Scalars['ID']['input'];
  plot: Scalars['String']['input'];
};

export type BookTagRelations = {
  __typename?: 'BookTagRelations';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  tagID: Scalars['ID']['output'];
};

export type BookTagRelationsInput = {
  bookID: Scalars['ID']['input'];
  tagID: Array<Scalars['ID']['input']>;
};

export type BooksResponse = {
  __typename?: 'BooksResponse';
  books: Array<Book>;
  totalCount: Scalars['Int']['output'];
};

export type BooksStatisticResponse = {
  __typename?: 'BooksStatisticResponse';
  author: Scalars['String']['output'];
  bookTitle: Scalars['String']['output'];
  count: Scalars['Int']['output'];
};

export type DescriptionPlot = {
  __typename?: 'DescriptionPlot';
  bookID: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  plot: Scalars['String']['output'];
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAdditionalMedia: Book;
  addBook: Book;
  addBookPlot: DescriptionPlot;
  addReadDate: ReadDate;
  createAuthor: Author;
  createSerie: Series;
  linkBookWithTag: Book;
};


export type MutationAddAdditionalMediaArgs = {
  input: Array<InputMaybe<AdditionalMediaInput>>;
};


export type MutationAddBookArgs = {
  input: BookInput;
};


export type MutationAddBookPlotArgs = {
  input: BookPlotInput;
};


export type MutationAddReadDateArgs = {
  input: ReadDateInput;
};


export type MutationCreateAuthorArgs = {
  input: AuthorInput;
};


export type MutationCreateSerieArgs = {
  input: SerieInput;
};


export type MutationLinkBookWithTagArgs = {
  input: BookTagRelationsInput;
};

export type Query = {
  __typename?: 'Query';
  getAllAuthors: AuthorResponse;
  getAllAuthorsByBooksCount: Array<AuthorMostReadResponse>;
  getAllBooksByDate: ReadBooksResponse;
  getAllBooksByName: BooksResponse;
  getAllBooksBySpecificDate: Array<ReadDate>;
  getAllTags: Array<Tags>;
  getMostReadAuthors: Array<AuthorsStatisticResponse>;
  getMostReadBooks: Array<BooksStatisticResponse>;
  getOneAuthor?: Maybe<Author>;
  getOneBook?: Maybe<Book>;
  getOneBookPlot?: Maybe<DescriptionPlot>;
  getReadStatistic: Array<Statistic>;
  getTagById: Tags;
  search: Array<SearchResult>;
  searchInAuthors: Array<Author>;
  searchInBooks: Array<Book>;
  searchInSeries: Array<Series>;
};


export type QueryGetAllAuthorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksByDateArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksByNameArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllBooksBySpecificDateArgs = {
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOneAuthorArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOneBookArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetOneBookPlotArgs = {
  bookID?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryGetReadStatisticArgs = {
  label: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetTagByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySearchArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInAuthorsArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInBooksArgs = {
  searchString: Scalars['String']['input'];
};


export type QuerySearchInSeriesArgs = {
  searchString: Scalars['String']['input'];
};

export type ReadBooksResponse = {
  __typename?: 'ReadBooksResponse';
  readDate: Array<ReadDate>;
  totalCount: Scalars['Int']['output'];
};

export type ReadDate = {
  __typename?: 'ReadDate';
  bookID: Scalars['ID']['output'];
  books: Book;
  id: Scalars['ID']['output'];
  readEnd: Scalars['Date']['output'];
};

export type ReadDateInput = {
  bookID: Scalars['ID']['input'];
  readEnd: Scalars['Date']['input'];
};

export type SearchResult = Author | Book;

export type SerieInput = {
  authorID: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Series = {
  __typename?: 'Series';
  authorID: Scalars['ID']['output'];
  booksInSeries: Array<Book>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Statistic = {
  __typename?: 'Statistic';
  count: Scalars['Int']['output'];
  period: Scalars['String']['output'];
};

export type Tags = {
  __typename?: 'Tags';
  booksInTag: Array<Book>;
  id: Scalars['ID']['output'];
  tag: Scalars['String']['output'];
};


export type TagsBooksInTagArgs = {
  sortBy?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllAuthorsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllAuthorsQuery = { __typename?: 'Query', getAllAuthors: { __typename?: 'AuthorResponse', totalCount: number, authors: Array<{ __typename?: 'Author', id: string, name: string, surname?: string | null, portraitThumbnail?: string | null }> } };

export type GetOneAuthorByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneAuthorByIdQuery = { __typename?: 'Query', author?: { __typename?: 'Author', name: string, surname?: string | null, portrait?: string | null, series: Array<{ __typename?: 'Series', title: string, booksInSeries: Array<{ __typename?: 'Book', title: string, rating?: number | null, bookCoverThumbnail?: string | null, id: string }> }>, booksWithoutSeries: Array<{ __typename?: 'Book', title: string, rating?: number | null, bookCoverThumbnail?: string | null, id: string }> } | null };

export type GetAllAuthorsByBooksCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAuthorsByBooksCountQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'AuthorMostReadResponse', name: string, surname?: string | null, id: string, portraitThumbnail?: string | null, count: number }> };

export type GetAllBooksByDateQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllBooksByDateQuery = { __typename?: 'Query', books: { __typename?: 'ReadBooksResponse', totalCount: number, readDate: Array<{ __typename?: 'ReadDate', id: string, books: { __typename?: 'Book', id: string, title: string, rating?: number | null, bookCoverThumbnail?: string | null, author: { __typename?: 'Author', surname?: string | null, name: string } } }> } };

export type GetOneBookIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneBookIdQuery = { __typename?: 'Query', book?: { __typename?: 'Book', title: string, rating?: number | null, description: string, bookCover?: string | null, isAdditionalMediaExist: boolean, author: { __typename?: 'Author', surname?: string | null, name: string, id: string }, series?: { __typename?: 'Series', title: string, booksInSeries: Array<{ __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null }> } | null, readDate: Array<{ __typename?: 'ReadDate', readEnd: any }>, tags: Array<{ __typename?: 'Tags', id: string, tag: string }> } | null };

export type GetBooksByTagQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetBooksByTagQuery = { __typename?: 'Query', tagData: { __typename?: 'Tags', tag: string, booksInTag: Array<{ __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null, rating?: number | null, author: { __typename?: 'Author', surname?: string | null, name: string } }> } };

export type GetOneBookPlotQueryVariables = Exact<{
  bookID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetOneBookPlotQuery = { __typename?: 'Query', book?: { __typename?: 'DescriptionPlot', plot: string } | null };

export type GetAllBooksBySpecificDateQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAllBooksBySpecificDateQuery = { __typename?: 'Query', bookInYear: Array<{ __typename?: 'ReadDate', readEnd: any, id: string, books: { __typename?: 'Book', id: string, title: string, bookCoverThumbnail?: string | null, rating?: number | null, author: { __typename?: 'Author', surname?: string | null, name: string } } }> };

export type GetReadStatisticQueryVariables = Exact<{
  label: Scalars['String']['input'];
  year?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetReadStatisticQuery = { __typename?: 'Query', statistic: Array<{ __typename?: 'Statistic', count: number, period: string }> };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tags', id: string, tag: string }> };

export type GetMediaForBookQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetMediaForBookQuery = { __typename?: 'Query', book?: { __typename?: 'Book', id: string, title: string, media?: { __typename?: 'AllMediaForItem', video: Array<{ __typename?: 'AdditionalMedia', id: string, type: MediaType, url: string }>, image: Array<{ __typename?: 'AdditionalMedia', id: string, url: string, type: MediaType }> } | null } | null };

export type SearchInBooksAndAuthorsQueryVariables = Exact<{
  searchString: Scalars['String']['input'];
}>;


export type SearchInBooksAndAuthorsQuery = { __typename?: 'Query', search: Array<
    | { __typename: 'Author', id: string, name: string, surname?: string | null }
    | { __typename: 'Book', id: string, title: string }
  > };


export const GetAllAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAuthors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"portraitThumbnail"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetAllAuthorsQuery, GetAllAuthorsQueryVariables>;
export const GetOneAuthorByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneAuthorById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"author"},"name":{"kind":"Name","value":"getOneAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"portrait"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"booksInSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"booksWithoutSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetOneAuthorByIdQuery, GetOneAuthorByIdQueryVariables>;
export const GetAllAuthorsByBooksCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAuthorsByBooksCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"authors"},"name":{"kind":"Name","value":"getAllAuthorsByBooksCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portraitThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetAllAuthorsByBooksCountQuery, GetAllAuthorsByBooksCountQueryVariables>;
export const GetAllBooksByDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBooksByDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"books"},"name":{"kind":"Name","value":"getAllBooksByDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetAllBooksByDateQuery, GetAllBooksByDateQueryVariables>;
export const GetOneBookIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneBookId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"booksInSeries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"readDate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readEnd"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookCover"}},{"kind":"Field","name":{"kind":"Name","value":"isAdditionalMediaExist"}}]}}]}}]} as unknown as DocumentNode<GetOneBookIdQuery, GetOneBookIdQueryVariables>;
export const GetBooksByTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBooksByTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tagData"},"name":{"kind":"Name","value":"getTagById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"booksInTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBooksByTagQuery, GetBooksByTagQueryVariables>;
export const GetOneBookPlotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOneBookPlot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBookPlot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plot"}}]}}]}}]} as unknown as DocumentNode<GetOneBookPlotQuery, GetOneBookPlotQueryVariables>;
export const GetAllBooksBySpecificDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllBooksBySpecificDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookInYear"},"name":{"kind":"Name","value":"getAllBooksBySpecificDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"books"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"bookCoverThumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"surname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"readEnd"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetAllBooksBySpecificDateQuery, GetAllBooksBySpecificDateQueryVariables>;
export const GetReadStatisticDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetReadStatistic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"statistic"},"name":{"kind":"Name","value":"getReadStatistic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"period"}}]}}]}}]} as unknown as DocumentNode<GetReadStatisticQuery, GetReadStatisticQueryVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"tags"},"name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}}]}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const GetMediaForBookDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMediaForBook"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"book"},"name":{"kind":"Name","value":"getOneBook"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","alias":{"kind":"Name","value":"media"},"name":{"kind":"Name","value":"additionalMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaForBookQuery, GetMediaForBookQueryVariables>;
export const SearchInBooksAndAuthorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInBooksAndAuthors"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchString"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchString"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Book"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Author"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"surname"}}]}}]}}]}}]} as unknown as DocumentNode<SearchInBooksAndAuthorsQuery, SearchInBooksAndAuthorsQueryVariables>;