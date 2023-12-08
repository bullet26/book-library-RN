export type BookStackParamList = {
  BookPlot: { id: string };
  BookDetail: { id: string };
  Author: { id: string };
  BookBySpecificDate: undefined;
};

export type RootStackParamList = {
  Book: { screen: string; params: { id: string } };
  Author: { id: string };
  Books: undefined;
  BookBySpecificDate: undefined;
  Authors: undefined;
};
