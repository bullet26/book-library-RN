export type BookStackParamList = {
  BookPlot: { id: string };
  BookDetail: { id: string };
  Author: { id: string };
  BookBySpecificDate: { year: string };
};

export type RootStackParamList = {
  Book: { screen: string; params: { id: string } };
  Author: { id: string };
  Books: undefined;
  BookBySpecificDate: { year: string };
  Authors: undefined;
};
