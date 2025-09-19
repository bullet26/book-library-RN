/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetAllAuthors($page: Int, $limit: Int) {\n    getAllAuthors(page: $page, limit: $limit) {\n      authors {\n        id\n        name\n        surname\n        portraitThumbnail\n      }\n      totalCount\n    }\n  }\n": typeof types.GetAllAuthorsDocument,
    "\n  query GetOneAuthorById($id: ID) {\n    author: getOneAuthor(id: $id) {\n      name\n      surname\n      portrait\n      series {\n        title\n        booksInSeries {\n          title\n          rating\n          bookCoverThumbnail\n          id\n        }\n      }\n      booksWithoutSeries {\n        title\n        rating\n        bookCoverThumbnail\n        id\n      }\n    }\n  }\n": typeof types.GetOneAuthorByIdDocument,
    "\n  query GetAllAuthorsByBooksCount {\n    authors: getAllAuthorsByBooksCount {\n      name\n      surname\n      id\n      portraitThumbnail\n      count\n    }\n  }\n": typeof types.GetAllAuthorsByBooksCountDocument,
    "\n  query GetAllBooksByDate($page: Int, $limit: Int) {\n    books: getAllBooksByDate(page: $page, limit: $limit) {\n      readDate {\n        id\n        books {\n          id\n          title\n          rating\n          bookCoverThumbnail\n          author {\n            surname\n            name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n": typeof types.GetAllBooksByDateDocument,
    "\n  query GetOneBookId($id: ID) {\n    book: getOneBook(id: $id) {\n      author {\n        surname\n        name\n        id\n      }\n      title\n      rating\n      series {\n        title\n        booksInSeries {\n          id\n          title\n          bookCoverThumbnail\n        }\n      }\n      description\n      readDate {\n        readEnd\n      }\n      tags {\n        id\n        tag\n      }\n      bookCover\n      isAdditionalMediaExist\n    }\n  }\n": typeof types.GetOneBookIdDocument,
    "\n  query GetBooksByTag($id: ID, $sortBy: String) {\n    tagData: getTagById(id: $id) {\n      tag\n      booksInTag(sortBy: $sortBy) {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetBooksByTagDocument,
    "\n  query GetOneBookPlot($bookID: ID) {\n    book: getOneBookPlot(bookID: $bookID) {\n      plot\n    }\n  }\n": typeof types.GetOneBookPlotDocument,
    "\n  query GetAllBooksBySpecificDate($year: Int) {\n    bookInYear: getAllBooksBySpecificDate(year: $year) {\n      books {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n      readEnd\n      id\n    }\n  }\n": typeof types.GetAllBooksBySpecificDateDocument,
    "\n  query GetReadStatistic($label: String!, $year: Int) {\n    statistic: getReadStatistic(label: $label, year: $year) {\n      count\n      period\n    }\n  }\n": typeof types.GetReadStatisticDocument,
    "\n  query GetAllTags {\n    tags: getAllTags {\n      id\n      tag\n    }\n  }\n": typeof types.GetAllTagsDocument,
    "\n  query GetMediaForBook($id: ID) {\n    book: getOneBook(id: $id) {\n      id\n      title\n      media: additionalMedia {\n        video {\n          id\n          type\n          url\n        }\n        image {\n          id\n          url\n          type\n        }\n      }\n    }\n  }\n": typeof types.GetMediaForBookDocument,
    "\n  query SearchInBooksAndAuthors($searchString: String!) {\n    search(searchString: $searchString) {\n      __typename\n      ... on Book {\n        id\n        title\n      }\n      ... on Author {\n        id\n        name\n        surname\n      }\n    }\n  }\n": typeof types.SearchInBooksAndAuthorsDocument,
};
const documents: Documents = {
    "\n  query GetAllAuthors($page: Int, $limit: Int) {\n    getAllAuthors(page: $page, limit: $limit) {\n      authors {\n        id\n        name\n        surname\n        portraitThumbnail\n      }\n      totalCount\n    }\n  }\n": types.GetAllAuthorsDocument,
    "\n  query GetOneAuthorById($id: ID) {\n    author: getOneAuthor(id: $id) {\n      name\n      surname\n      portrait\n      series {\n        title\n        booksInSeries {\n          title\n          rating\n          bookCoverThumbnail\n          id\n        }\n      }\n      booksWithoutSeries {\n        title\n        rating\n        bookCoverThumbnail\n        id\n      }\n    }\n  }\n": types.GetOneAuthorByIdDocument,
    "\n  query GetAllAuthorsByBooksCount {\n    authors: getAllAuthorsByBooksCount {\n      name\n      surname\n      id\n      portraitThumbnail\n      count\n    }\n  }\n": types.GetAllAuthorsByBooksCountDocument,
    "\n  query GetAllBooksByDate($page: Int, $limit: Int) {\n    books: getAllBooksByDate(page: $page, limit: $limit) {\n      readDate {\n        id\n        books {\n          id\n          title\n          rating\n          bookCoverThumbnail\n          author {\n            surname\n            name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n": types.GetAllBooksByDateDocument,
    "\n  query GetOneBookId($id: ID) {\n    book: getOneBook(id: $id) {\n      author {\n        surname\n        name\n        id\n      }\n      title\n      rating\n      series {\n        title\n        booksInSeries {\n          id\n          title\n          bookCoverThumbnail\n        }\n      }\n      description\n      readDate {\n        readEnd\n      }\n      tags {\n        id\n        tag\n      }\n      bookCover\n      isAdditionalMediaExist\n    }\n  }\n": types.GetOneBookIdDocument,
    "\n  query GetBooksByTag($id: ID, $sortBy: String) {\n    tagData: getTagById(id: $id) {\n      tag\n      booksInTag(sortBy: $sortBy) {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n    }\n  }\n": types.GetBooksByTagDocument,
    "\n  query GetOneBookPlot($bookID: ID) {\n    book: getOneBookPlot(bookID: $bookID) {\n      plot\n    }\n  }\n": types.GetOneBookPlotDocument,
    "\n  query GetAllBooksBySpecificDate($year: Int) {\n    bookInYear: getAllBooksBySpecificDate(year: $year) {\n      books {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n      readEnd\n      id\n    }\n  }\n": types.GetAllBooksBySpecificDateDocument,
    "\n  query GetReadStatistic($label: String!, $year: Int) {\n    statistic: getReadStatistic(label: $label, year: $year) {\n      count\n      period\n    }\n  }\n": types.GetReadStatisticDocument,
    "\n  query GetAllTags {\n    tags: getAllTags {\n      id\n      tag\n    }\n  }\n": types.GetAllTagsDocument,
    "\n  query GetMediaForBook($id: ID) {\n    book: getOneBook(id: $id) {\n      id\n      title\n      media: additionalMedia {\n        video {\n          id\n          type\n          url\n        }\n        image {\n          id\n          url\n          type\n        }\n      }\n    }\n  }\n": types.GetMediaForBookDocument,
    "\n  query SearchInBooksAndAuthors($searchString: String!) {\n    search(searchString: $searchString) {\n      __typename\n      ... on Book {\n        id\n        title\n      }\n      ... on Author {\n        id\n        name\n        surname\n      }\n    }\n  }\n": types.SearchInBooksAndAuthorsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllAuthors($page: Int, $limit: Int) {\n    getAllAuthors(page: $page, limit: $limit) {\n      authors {\n        id\n        name\n        surname\n        portraitThumbnail\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetAllAuthors($page: Int, $limit: Int) {\n    getAllAuthors(page: $page, limit: $limit) {\n      authors {\n        id\n        name\n        surname\n        portraitThumbnail\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOneAuthorById($id: ID) {\n    author: getOneAuthor(id: $id) {\n      name\n      surname\n      portrait\n      series {\n        title\n        booksInSeries {\n          title\n          rating\n          bookCoverThumbnail\n          id\n        }\n      }\n      booksWithoutSeries {\n        title\n        rating\n        bookCoverThumbnail\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOneAuthorById($id: ID) {\n    author: getOneAuthor(id: $id) {\n      name\n      surname\n      portrait\n      series {\n        title\n        booksInSeries {\n          title\n          rating\n          bookCoverThumbnail\n          id\n        }\n      }\n      booksWithoutSeries {\n        title\n        rating\n        bookCoverThumbnail\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllAuthorsByBooksCount {\n    authors: getAllAuthorsByBooksCount {\n      name\n      surname\n      id\n      portraitThumbnail\n      count\n    }\n  }\n"): (typeof documents)["\n  query GetAllAuthorsByBooksCount {\n    authors: getAllAuthorsByBooksCount {\n      name\n      surname\n      id\n      portraitThumbnail\n      count\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllBooksByDate($page: Int, $limit: Int) {\n    books: getAllBooksByDate(page: $page, limit: $limit) {\n      readDate {\n        id\n        books {\n          id\n          title\n          rating\n          bookCoverThumbnail\n          author {\n            surname\n            name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GetAllBooksByDate($page: Int, $limit: Int) {\n    books: getAllBooksByDate(page: $page, limit: $limit) {\n      readDate {\n        id\n        books {\n          id\n          title\n          rating\n          bookCoverThumbnail\n          author {\n            surname\n            name\n          }\n        }\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOneBookId($id: ID) {\n    book: getOneBook(id: $id) {\n      author {\n        surname\n        name\n        id\n      }\n      title\n      rating\n      series {\n        title\n        booksInSeries {\n          id\n          title\n          bookCoverThumbnail\n        }\n      }\n      description\n      readDate {\n        readEnd\n      }\n      tags {\n        id\n        tag\n      }\n      bookCover\n      isAdditionalMediaExist\n    }\n  }\n"): (typeof documents)["\n  query GetOneBookId($id: ID) {\n    book: getOneBook(id: $id) {\n      author {\n        surname\n        name\n        id\n      }\n      title\n      rating\n      series {\n        title\n        booksInSeries {\n          id\n          title\n          bookCoverThumbnail\n        }\n      }\n      description\n      readDate {\n        readEnd\n      }\n      tags {\n        id\n        tag\n      }\n      bookCover\n      isAdditionalMediaExist\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBooksByTag($id: ID, $sortBy: String) {\n    tagData: getTagById(id: $id) {\n      tag\n      booksInTag(sortBy: $sortBy) {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooksByTag($id: ID, $sortBy: String) {\n    tagData: getTagById(id: $id) {\n      tag\n      booksInTag(sortBy: $sortBy) {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOneBookPlot($bookID: ID) {\n    book: getOneBookPlot(bookID: $bookID) {\n      plot\n    }\n  }\n"): (typeof documents)["\n  query GetOneBookPlot($bookID: ID) {\n    book: getOneBookPlot(bookID: $bookID) {\n      plot\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllBooksBySpecificDate($year: Int) {\n    bookInYear: getAllBooksBySpecificDate(year: $year) {\n      books {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n      readEnd\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetAllBooksBySpecificDate($year: Int) {\n    bookInYear: getAllBooksBySpecificDate(year: $year) {\n      books {\n        id\n        title\n        bookCoverThumbnail\n        rating\n        author {\n          surname\n          name\n        }\n      }\n      readEnd\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetReadStatistic($label: String!, $year: Int) {\n    statistic: getReadStatistic(label: $label, year: $year) {\n      count\n      period\n    }\n  }\n"): (typeof documents)["\n  query GetReadStatistic($label: String!, $year: Int) {\n    statistic: getReadStatistic(label: $label, year: $year) {\n      count\n      period\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTags {\n    tags: getAllTags {\n      id\n      tag\n    }\n  }\n"): (typeof documents)["\n  query GetAllTags {\n    tags: getAllTags {\n      id\n      tag\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMediaForBook($id: ID) {\n    book: getOneBook(id: $id) {\n      id\n      title\n      media: additionalMedia {\n        video {\n          id\n          type\n          url\n        }\n        image {\n          id\n          url\n          type\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMediaForBook($id: ID) {\n    book: getOneBook(id: $id) {\n      id\n      title\n      media: additionalMedia {\n        video {\n          id\n          type\n          url\n        }\n        image {\n          id\n          url\n          type\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchInBooksAndAuthors($searchString: String!) {\n    search(searchString: $searchString) {\n      __typename\n      ... on Book {\n        id\n        title\n      }\n      ... on Author {\n        id\n        name\n        surname\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchInBooksAndAuthors($searchString: String!) {\n    search(searchString: $searchString) {\n      __typename\n      ... on Book {\n        id\n        title\n      }\n      ... on Author {\n        id\n        name\n        surname\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;