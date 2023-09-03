// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbwoFnHYzAzp6nwfeY4Q_71d5nZnOYHJM",
  authDomain: "fir-prime-touch.firebaseapp.com",
  projectId: "fir-prime-touch",
  storageBucket: "fir-prime-touch.appspot.com",
  messagingSenderId: "323956829902",
  appId: "1:323956829902:web:62dce327203d158768ea9f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
