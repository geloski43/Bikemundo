import * as firebase from "firebase";


const firebaseConfig = {
  apiKey: "AIzaSyABmKeX9n7utFtYdpq0tifDLjQrQl4MVI0",
  authDomain: "bikemundo-c077b.firebaseapp.com",
  databaseURL: "https://bikemundo-c077b.firebaseio.com",
  projectId: "bikemundo-c077b",
  storageBucket: "bikemundo-c077b.appspot.com",
  messagingSenderId: "520276098442",
  appId: "1:520276098442:web:2a4c4171c1d2ee006bdc73"
};

firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();