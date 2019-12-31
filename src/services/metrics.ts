import Store from "../utils/firebase";
import { firestore } from "firebase";
const BackgroundMetrics: firestore.CollectionReference = Store.db.collection("songBackgroundMetrics");

export const fetchOne = (residentId: string, songId: number) => {
  const Query = BackgroundMetrics.doc(`${residentId}-${songId}`);
  return Query.get()
    .then((document: firestore.DocumentSnapshot) => {
      if (document.exists) {
        const metric: any = document.data();
        metric.id = document.id;
        return metric;
      }
      return null;
    })
    .catch((error: Error) => {
      console.error("Error when fetching one background metric: ", error);
    });
}

export const create = (residentId: string, songTrackId: string) => {
  /**
   * Background metrics are created for every song that any user listens to
   * Is created when song first loads before all other tracking is done such
   *   as skipped vs played, and flagging
   */
  return BackgroundMetrics.doc(`${residentId}-${songTrackId}`).set({
    residentId,
    songTrackId,
    timesSkipped: 0,
    timesPlayed: 0,
    flagAsNotRelevant: false,
  }, { merge: true });
}

export const trackSkipped = (residentId: string, songTrackId: number, previousSkipCount: number | null) => {
  const count = previousSkipCount ? previousSkipCount + 1 : 1;
  return BackgroundMetrics.doc(`${residentId}-${songTrackId}`).update({
    timesSkipped: count,
  });
}

export const trackPlayed = (residentId: string, songTrackId: number, previousPlayedCount: number | null) => {
  const count = previousPlayedCount ? previousPlayedCount + 1 : 1;
  return BackgroundMetrics.doc(`${residentId}-${songTrackId}`).update({
    timesPlayed: count,
  });
}

/**
 * If song is flagged as not relevant, it should not be played for this user anymore
 * In the back end, there will be some logic where if enough users flag this track,
 *   it will be blacklisted and removed from all playlists
 * 
 * @param residentId 
 * @param songTrackId 
 */
export const flagSong = async (residentId: string, songTrackId: number) => {
  return await BackgroundMetrics.doc(`${residentId}-${songTrackId}`).update({
    flagAsNotRelevant: true,
  });
}