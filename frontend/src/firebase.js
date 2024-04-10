// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore for database functionalities

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and Firestore Database
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore here
const provider = new GoogleAuthProvider();

// Export the services for use in your components
export { auth, provider, db, app };
