import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query GetAllAuthors($page: Int, $limit: Int) {
    getAllAuthors(page: $page, limit: $limit) {
      authors {
        id: _id
        name
        surname
        portraitThumbnail
      }
      totalCount
    }
  }
`;

export const ONE_AUTHOR_BY_ID = gql`
  query GetOneAuthor($id: ID) {
    author: getOneAuthor(id: $id) {
      name
      surname
      portrait
      series {
        title
        booksInSeries {
          title
          rating
          bookCoverThumbnail
          id: _id
        }
      }
      booksWithoutSeries {
        title
        rating
        bookCoverThumbnail
        id: _id
      }
    }
  }
`;

export const ALL_AUTHORS_BY_BOOKS_COUNT = gql`
  query GetAllAuthorsByBooksCount {
    authors: getAllAuthorsByBooksCount {
      name
      surname
      id
      portraitThumbnail
      count
    }
  }
`;
