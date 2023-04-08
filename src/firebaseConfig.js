import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//Configure it on your own, you can do it by going to your firebase project's settings 
//And adding a web application. This won't work with the current censored values.
//https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "********************",
  authDomain: "**********.firebaseapp.com",
  projectId: "**********",
  storageBucket: "**********.appspot.com",
  messagingSenderId: "**********",
  appId: "1:**********",
  measurementId: "G-LHJ69ZCHH3"
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export {app, firestore};