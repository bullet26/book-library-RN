export type BookStackParamList = {
  BookPlot: { id: string };
  BookDetail: { id: string };
};

export type RootStackParamList = {
  Book: { screen: string; params: { id: string } };
  Author: { id: string };
  Books: undefined;
  Authors: undefined;
};
