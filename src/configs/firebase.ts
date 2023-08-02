import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAg-ZAB9D7Jrvqw9nr-yTHgn0EF8vKulxE",
//   authDomain: "farm-react-redux-app.firebaseapp.com",
//   projectId: "farm-react-redux-app",
//   storageBucket: "farm-react-redux-app.appspot.com",
//   messagingSenderId: "1082212208478",
//   appId: "1:1082212208478:web:3ff8fa8dd7234d92cc89cf",
//   measurementId: "G-4X8H2JJZ5E"
// };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
  measurementId: import.meta.env.VITE_FIREBASE_measurementId,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
