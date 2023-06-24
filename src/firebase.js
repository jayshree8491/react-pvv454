import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Add your Firebase project configuration here
const firebaseConfig = {
  // Your Firebase configuration details
  apiKey: "AIzaSyAs2ipx0XNFsvp6VVT4ZQGo5QAbchDKLNI",
  authDomain: "train-reservation-27043.firebaseapp.com",
  databaseURL: "https://train-reservation-27043-default-rtdb.firebaseio.com",
  projectId: "train-reservation-27043",
  storageBucket: "train-reservation-27043.appspot.com",
  messagingSenderId: "274901364417",
  appId: "1:274901364417:web:0e95e323111a244a7f6e40",
  measurementId: "G-SHHG4CFSD8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;
