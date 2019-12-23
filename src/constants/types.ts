export enum SelectMethods {
  Click = "click",
  Select = "select",
}

export enum InstrumentOptions {
  Canto = 1,
  Piano = 2,
  Bateria = 3,
  Flauto = 4,
  GuitarraAcustica = 5,
  Trompeta = 6,
  Violin = 7,
  Otro = 8
}

export enum MusicGenre {
  Tango = 1,
  Cueca = 2,
  Bolero = 3,
  Balada = 4,
  Clásica = 5,
  Folklore = 6,
  Rock = 7,
  Otra = 8,
}

export enum MusicGenreLabels {
  Tango = "tango",
  Cueca = "cueca",
  Bolero = "bolero",
  Balada = "balada",
  Clásica = "clasica",
  Folklore = "folklore",
  Rock = "rock",
  Otra = "otro",
}

export enum PrefieraMusica {
  Cantada = 1,
  Orquestada = 2,
  Ambas = 3,
}

export enum Countries {
  Chile = "chile",
  Mexico = "mexico",
  UnitedStates = "united-states",
  Argentina = "argentina",
}

export interface IResidentStore {
  id: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  hospital: string;
  residentFullName: string;
  preferenceId?: any;
}

export interface IEmotionsByTrack {
  [trackId: number]: ISingleEmotion;
}

export interface ISingleEmotion {
  id?: string;
  songTrackId: number;
  genre: string[];
  yearRelease: number;
  artist: string;
  title: string;
  residentId: string;
  rating: number;
  ratingReadable: EnumRatingReadable;
  nurseComment?: string;
}

export interface IBackgroundMetricsByTrack {
  [trackId: number]: ISingleSongBackgroundMetrics;
}

export interface ISingleSongBackgroundMetrics {
  residentId: string;
  songTrackId: number;
  timesSkipped: number;
  timesPlayed: number;
}

export enum EnumRatingReadable {
  Alegria = "Alegría",
  Smiling = "Smiling",
  Frown = "Frowning",
  Mad = "Mad",
  Cry = "Cry",
}

export const RatingsReadableMapping = {
  1: "Cry",
  2: "Mad",
  3: "Frowning",
  4: "Smiling",
  5: "Alegría",
};

enum MusicImportance {
  Muy = 4,
  Moderadamente = 3,
  Poco = 2,
  Nada = 1,
}

interface IGenreGustan {
  balada: boolean;
  bolero: boolean;
  clasica: boolean;
  cueca: boolean;
  folklore: boolean;
  otro: string | false;
  rock: boolean;
  tango: boolean;
}

interface IPlayedInstrument {
  bateria: boolean;
  canto: boolean;
  flauta: boolean;
  guitarraAcustica: boolean;
  otra: string | boolean;
  piano: boolean;
  trompeta: boolean;
  violin: boolean;
}

export interface IPreferenceStore {
  artistasGustan: string[];
  cityBorned: string | null;
  genreGustan: IGenreGustan;
  lastUpdated: {
    nanoseconds: number;
    seconds: number;
  } | null;
  musicImportance: MusicImportance | null;
  playedInstrument: IPlayedInstrument;
  playedInstrumentOrSanged: boolean | null;
  prefiereLaMusica: string | null;
  residentId: string | null;
  yearBorn: number | null;
}

export enum Importance {
  Muy = 4,
  Moderadamente = 3,
  Poco = 2,
  Nada = 1,
}

export const answersOptions = {
  4: { display: "Muy importante", value: Importance.Muy },
  3: { display: "Moderadamente Importante", value: Importance.Moderadamente },
  2: { display: "Poco importante", value: Importance.Poco },
  1: { display: "Nada importante", value: Importance.Nada },
};

export interface IResident {
  dateOfBirth?: string;
  firstName: string;
  lastName: string;
  gender: string;
  preferenceId?: string;
  hospital: string;
  residentFullName: string;
}

export interface IHospital {
  city: string;
  country: string;
  name: string;
}

export interface IEmotions {
  artists: string;
  comment: string;
  musicTrackId: string;
  rating: number;
}

// Discogs meta data
export enum MetaTypes {
  DiscogsSearch = "discogs_search",
  Direct = "direct",
}

export interface IDiscogsSearchMetaRaw {
  barcode?: any[];
  catno?: string;
  community?: {
    want: number;
    have: number;
  },
  country: string;
  cover_image: string;
  format?: string[];
  genre: string[];
  id: number;
  label?: string[];
  resource_url?: string;
  style: string[];
  thumb?: string;
  title: string;
  type?: string;
  uri?: string;
  user_data?: {
    in_collection: boolean;
    in_wantlist: boolean
  },
  year: string;
}

export interface ISearchMeta {
  artist: string;
  cover: string;
  genre: string[];
  id: number;
  song: string;
  title: string;
  year: string;
  type: MetaTypes;
}

export interface IDirectMeta {
  artist: string;
  song: string;
  youtubeId: string;
}

export interface IDirectMetaFiltered {
  artist: string;
  song: string;
  youtubeId: string;
  type: MetaTypes;
}