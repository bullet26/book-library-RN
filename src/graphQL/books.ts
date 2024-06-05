import { gql } from '@apollo/client';

export const ALL_BOOKS_BY_DATE = gql`
  query GetAllBooksByDate($page: Int, $limit: Int) {
    books: getAllBooksByDate(page: $page, limit: $limit) {
      readDate {
        id: _id
        books {
          id: _id
          title
          rating
          bookCoverThumbnail
          author {
            surname
            name
          }
        }
      }
      totalCount
    }
  }
`;
export const ONE_BOOK_BY_ID = gql`
  query GetOneBookId($id: ID) {
    book: getOneBook(id: $id) {
      author {
        surname
        name
        id: _id
      }
      title
      rating
      series {
        title
        booksInSeries {
          id: _id
          title
          bookCoverThumbnail
        }
      }
      description
      readDate {
        readEnd
      }
      tags {
        id: _id
        tag
      }
      bookCover
    }
  }
`;

export const ALL_BOOKS_BY_TAG = gql`
  query GetBooksByTag($id: ID, $sortBy: String) {
    tagData: getTagById(id: $id, sortBy: $sortBy) {
      tag
      booksInTag {
        id: _id
        title
        bookCoverThumbnail
        rating
        author {
          surname
          name
        }
      }
    }
  }
`

export const ONE_BOOK_PLOT = gql`
  query GetOneBookPlot($bookID: ID) {
    book: getOneBookPlot(bookID: $bookID) {
      plot
    }
  }
`;
export const ALL_BOOKS_BY_SPECIFIC_DATE = gql`
  query GetAllBooksBySpecificDate($year: Int) {
    bookInYear: getAllBooksBySpecificDate(year: $year) {
      books {
        id: _id
        title
        bookCoverThumbnail
        rating
        author {
          surname
          name
        }
      }
      readEnd
      id: _id
    }
  }
`;

export const READ_STATISTIC = gql`
  query GetMostReadedBooks($label: String, $year: Int) {
    statistic: getReadStatistic(label: $label, year: $year) {
      count
      period
    }
  }
`;

export const ALL_TAGS = gql`
  query GetAllTags {
    tags: getAllTags {
      id: _id
      tag
    }
  }
`;
