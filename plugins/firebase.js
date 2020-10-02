import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

if (!firebase.apps.length) {
  var firebaseConfig = {
    apiKey: "<replace this>",
    authDomain: "<replace this>",
    databaseURL: "<replace this>",
    projectId: "<replace this>",
    storageBucket: "<replace this>",
    messagingSenderId: "<replace this>",
    appId: "<replace this>",
    measurementId: "<replace this>"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
export { db, firebase };
