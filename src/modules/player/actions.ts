import { IStoreState } from "../../store";
import Store from "redux-zero/interfaces/Store";

const actions = (store: Store) => ({
  selectTrack: (state: IStoreState, trackId: number) => {
    return {
      ...state,
      musicPlayerSettings: {
        ...state.musicPlayerSettings,
        currentTrackIndex: trackId
      }
    };
  },

  nextTrackInList: (state: IStoreState) => {
    console.log("state >> ", state);
  },

  prevTrackInList: (state: IStoreState) => {
    if (state.musicPlayerSettings.currentTrackIndex === 0) {
      return state;
    }
    const nextTrack = state.musicPlayerSettings.currentTrackIndex - 1;
    return {
      ...state,
      musicPlayerSettings: {
        ...state.musicPlayerSettings,
        currentTrackIndex: nextTrack
      }
    };
  }
});

export default actions;
