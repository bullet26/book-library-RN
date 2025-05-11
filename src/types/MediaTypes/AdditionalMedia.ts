export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
}

export interface AdditionalMedia {
  id: string;
  bookID: string;
  url: string;
  type: MediaType;
}

export interface AllMediaForItem {
  image: AdditionalMedia[];
  video: AdditionalMedia[];
}
