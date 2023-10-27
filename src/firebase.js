// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6STSLhMEFF0xBI6boMrbmCh0jW1S_6yQ",
  authDomain: "waleed-5bf05.firebaseapp.com",
  projectId: "waleed-5bf05",
  storageBucket: "waleed-5bf05.appspot.com",
  messagingSenderId: "302867618364",
  appId: "1:302867618364:web:f35a84e494f0da8cde4139",
  measurementId: "G-J7RJPPMXSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: "tutorial-5a2cf.firebaseapp.com",
//   projectId: "tutorial-5a2cf",
//   storageBucket: "tutorial-5a2cf.appspot.com",
//   messagingSenderId: "585126334212",
//   appId: "1:585126334212:web:8539eafc56885e1b4c4a51"
// };

// const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
