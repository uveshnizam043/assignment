// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}  from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo7p0N8LgX3BS9csQx2cEhAsJwwPd64TU",
  authDomain: "assignment-37df1.firebaseapp.com",
  projectId: "assignment-37df1",
  storageBucket: "assignment-37df1.appspot.com",
  messagingSenderId: "224835955178",
  appId: "1:224835955178:web:1e49f1b5513ff4540a2a93",
  measurementId: "G-HLHZ472M8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth=getAuth(app)
export const auth = getAuth(app);


