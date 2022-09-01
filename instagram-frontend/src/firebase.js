import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD9FHQaeqr7jUdJHsxBu33TJeNZasey0J8",
  authDomain: "instagram-clone-d13e6.firebaseapp.com",
  projectId: "instagram-clone-d13e6",
  storageBucket: "instagram-clone-d13e6.appspot.com",
  messagingSenderId: "778309920976",
  appId: "1:778309920976:web:1fd54c1d6c818dddb196d5",
  measurementId: "G-47BDNKT5YJ",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
