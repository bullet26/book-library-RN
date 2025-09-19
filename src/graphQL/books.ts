import { graphql } from './__generated__';

export const ALL_BOOKS_BY_DATE = graphql(`
  query GetAllBooksByDate($page: Int, $limit: Int) {
    books: getAllBooksByDate(page: $page, limit: $limit) {
      readDate {
        id
        books {
          id
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
`);

export const ONE_BOOK_BY_ID = graphql(`
  query GetOneBookId($id: ID) {
    book: getOneBook(id: $id) {
      author {
        surname
        name
        id
      }
      title
      rating
      series {
        title
        booksInSeries {
          id
          title
          bookCoverThumbnail
        }
      }
      description
      readDate {
        readEnd
      }
      tags {
        id
        tag
      }
      bookCover
      isAdditionalMediaExist
    }
  }
`);

export const ALL_BOOKS_BY_TAG = graphql(`
  query GetBooksByTag($id: ID, $sortBy: String) {
    tagData: getTagById(id: $id) {
      tag
      booksInTag(sortBy: $sortBy) {
        id
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
`);

export const ONE_BOOK_PLOT = graphql(`
  query GetOneBookPlot($bookID: ID) {
    book: getOneBookPlot(bookID: $bookID) {
      plot
    }
  }
`);
export const ALL_BOOKS_BY_SPECIFIC_DATE = graphql(`
  query GetAllBooksBySpecificDate($year: Int) {
    bookInYear: getAllBooksBySpecificDate(year: $year) {
      books {
        id
        title
        bookCoverThumbnail
        rating
        author {
          surname
          name
        }
      }
      readEnd
      id
    }
  }
`);

export const READ_STATISTIC = graphql(`
  query GetReadStatistic($label: String!, $year: Int) {
    statistic: getReadStatistic(label: $label, year: $year) {
      count
      period
    }
  }
`);

export const ALL_TAGS = graphql(`
  query GetAllTags {
    tags: getAllTags {
      id
      tag
    }
  }
`);

export const ALL_MEDIA_FOR_BOOK = graphql(`
  query GetMediaForBook($id: ID) {
    book: getOneBook(id: $id) {
      id
      title
      media: additionalMedia {
        video {
          id
          type
          url
        }
        image {
          id
          url
          type
        }
      }
    }
  }
`);
