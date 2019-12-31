import firebase from "../utils/firebase";

export async function getYoutubeAudio(gsURL: string) {
  // const gsRef = 'gs://jusaudio-7a9b0.appspot.com/ytaudio/Relaxing Chrono Cross Music-WUDsKai0Yac.m4a';
  // const gsRef2 = 'gs://jusaudio-7a9b0.appspot.com/favebiz_favepay1.png';

  const ref = firebase.storage.refFromURL(gsURL);

  // console.log('ref >> ', ref);
  const url = await ref.getDownloadURL();
  console.log('FB audio url >> ', url);
  return url;
}

export function getAudioFromStorage(ref: firebase.storage.Reference) {
  console.log('ref :: ', ref);
}
