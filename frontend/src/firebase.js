// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCiiyF1C9lQqu43gzZmN3QTAxsgSvnFeBI",
    authDomain: "grouper-476b0.firebaseapp.com",
    projectId: "grouper-476b0",
    storageBucket: "grouper-476b0.appspot.com",
    messagingSenderId: "234644985143",
    appId: "1:234644985143:web:680a8b446515d016a136b2",
    measurementId: "G-YN513RK9CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, app }; 
