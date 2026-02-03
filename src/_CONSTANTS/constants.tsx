export type Band =
  | "Pink"
  | "Red"
  | "Yellow"
  | "Blue"
  | "Green"
  | "Orange"
  | "Turquoise"
  | "Purple"
  | "Gold"
  | "White";

export const BAND_ORDER: Record<Band, number> = {
  Pink: 1,
  Red: 2,
  Yellow: 3,
  Blue: 4,
  Green: 5,
  Orange: 6,
  Turquoise: 7,
  Purple: 8,
  Gold: 9,
  White: 10,
};

export interface BandingMeta {
  band: Band;
  score: number;
}

export type BooksMeta = {
  id: string;
  title: string;
  coverImage: string;
  band: Band;
  textualContentOnlyBand: string;
  numericScore: number;
};
