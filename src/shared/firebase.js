import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const API_KEY = process.env.REACT_APP_API_KEY;

const firebaseConfig ={
  apiKey: `${API_KEY}`,
  authDomain: "react-homwork3.firebaseapp.com",
  projectId: "react-homwork3",
  storageBucket: "react-homwork3.appspot.com",
  messagingSenderId: "390828582281",
  appId: "1:390828582281:web:2246986522bc3a96f9ed58",
  measurementId: "G-FRXVD40EZM"
}

firebase.initializeApp(firebaseConfig);

const auth=firebase.auth();
const apiKey=firebaseConfig.apiKey;
const firestore =firebase.firestore();
const storage =firebase.storage();
export {auth,apiKey,firestore,storage};