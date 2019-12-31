import firebase from "../utils/firebase";

export function getYoutubeAudio(vid: string) {
  const gsRef = 'gs://jusaudio-7a9b0.appspot.com/ytaudio/Relaxing Chrono Cross Music-WUDsKai0Yac.m4a';
  const gsRef2 = 'gs://jusaudio-7a9b0.appspot.com/favebiz_favepay1.png';

  const ref = firebase.storage.refFromURL(gsRef2);

  console.log('ref >> ', ref);
}

export function getAudioFromStorage(ref: firebase.storage.Reference) {
  console.log('ref :: ', ref);
}
