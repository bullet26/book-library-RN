import { Author, Book, Search as ISearch } from 'types';

export const checkTypesTitle = (item: ISearch) => {
  if (Object.hasOwn(item, 'name')) {
    const author = item as Author;
    return {
      id: author?.id || '',
      type: 'authors',
      title: `${author.name} ${author.surname}`,
    };
  }
  if (Object.hasOwn(item, 'title')) {
    const book = item as Book;
    return {
      id: book.id || '',
      type: 'books',
      title: book.title,
    };
  }
  return { id: '', type: '', title: '' };
};
