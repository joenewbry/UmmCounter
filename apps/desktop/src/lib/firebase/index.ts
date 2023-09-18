// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxQ4rBMy8uhM0Zt1WRZhzAF_VdAryQI8E',
  authDomain: 'ummcounter.firebaseapp.com',
  projectId: 'ummcounter',
  storageBucket: 'ummcounter.appspot.com',
  messagingSenderId: '513961491951',
  appId: '1:513961491951:web:9e9a5bb4d7a9ed7b780a1a',
  measurementId: 'G-EPY3M2V3M9',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleAuthProvider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);
