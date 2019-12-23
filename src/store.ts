import createStore from "redux-zero";
import {
  IEmotionsByTrack,
  IBackgroundMetricsByTrack
} from "./constants/types";

export interface IStoreState {
  musicPlayerSettings: IMusicPlayerSettings;
  emotions: IEmotionsByTrack;
  backgroundMetrics: IBackgroundMetricsByTrack;
}

export interface IMusicPlayerSettings {
  currentTrackIndex: number;
  musicListLoading: boolean;
}

const musicPlayerSettings: IMusicPlayerSettings = {
  currentTrackIndex: 0,
  musicListLoading: false,
}

export const initialState: IStoreState = {
  musicPlayerSettings,
  emotions: {},
  backgroundMetrics: {},
};

const store = createStore(initialState);
export default store;
