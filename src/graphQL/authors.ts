import { graphql } from './__generated__';

export const ALL_AUTHORS = graphql(`
  query GetAllAuthors($page: Int, $limit: Int) {
    getAllAuthors(page: $page, limit: $limit) {
      authors {
        id
        name
        surname
        portraitThumbnail
      }
      totalCount
    }
  }
`);

export const ONE_AUTHOR_BY_ID = graphql(`
  query GetOneAuthorById($id: ID) {
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
          id
        }
      }
      booksWithoutSeries {
        title
        rating
        bookCoverThumbnail
        id
      }
    }
  }
`);

export const ALL_AUTHORS_BY_BOOKS_COUNT = graphql(`
  query GetAllAuthorsByBooksCount {
    authors: getAllAuthorsByBooksCount {
      name
      surname
      id
      portraitThumbnail
      count
    }
  }
`);
