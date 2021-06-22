import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAeKgr4iT1V7zhoS_tsFa-4XcMAkvCWj98",
  authDomain: "clone-3919f.firebaseapp.com",
  databaseURL: "https://clone-3919f.firebaseio.com",
  projectId: "clone-3919f",
  storageBucket: "clone-3919f.appspot.com",
  messagingSenderId: "15399558305",
  appId: "1:15399558305:web:9a505d5f483ba3c812e4e0",
  measurementId: "G-LHJ94REHT0",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

export { auth, db };
