import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "jusaudio-7a9b0.firebaseapp.com",
    databaseURL: "https://jusaudio-7a9b0.firebaseio.com",
    projectId: "jusaudio-7a9b0",
    storageBucket: "jusaudio-7a9b0.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  });
}

// Initialize and export Cloud Firestore through Firebase
const settings = { timestampsInSnapshots: true };
const db = firebase.firestore();
const rtdb = firebase.database();
const storage = firebase.storage();
db.settings(settings);
export default {
  db,
  rtdb,
  storage,
};
