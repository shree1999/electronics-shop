import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrGBgz7sOzqCLFNI_K8lJIKIdPZ19s8ro",
  authDomain: "e-commerce-dad49.firebaseapp.com",
  databaseURL: "https://e-commerce-dad49.firebaseio.com",
  projectId: "e-commerce-dad49",
  storageBucket: "e-commerce-dad49.appspot.com",
  messagingSenderId: "356596322539",
  appId: "1:356596322539:web:592b076c50abeeca266eae",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
