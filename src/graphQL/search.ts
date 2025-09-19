import { graphql } from './__generated__';

export const SEARCH_IN_BOOKS_AND_AUTHORS = graphql(`
  query SearchInBooksAndAuthors($searchString: String!) {
    search(searchString: $searchString) {
      __typename
      ... on Book {
        id
        title
      }
      ... on Author {
        id
        name
        surname
      }
    }
  }
`);
