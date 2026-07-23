export type AudioTrack = {
  languageCode: string;
  languageName: string;
  audioUrl: string;
};

export type CardItem = {
  id: string;
  order: number;
  imageUrl: string;
  alt: string;
  audios: AudioTrack[];
};

export type Issue = {
  id: string;
  publishDate: string;
  title: string;
  cards: CardItem[];
};
