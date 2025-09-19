export type BookStackParamList = {
  BookPlot: { id: string };
  BookDetail: { id: string };
  BookMedia: { id: string };
  Author: { id: string };
  BookBySpecificDate: { year: string };
  BookByTag: { id: string };
};

export type RootStackParamList = {
  Book: { screen: string; params: { id: string } };
  Author: { id: string };
  Books: undefined;
  BookBySpecificDate: { year: string };
  BookByTag: { id: string };
  Authors: undefined;
  MostRededAuthors: undefined;
};
