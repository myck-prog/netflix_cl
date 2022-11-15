// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZaF2XFkon6WLYcCQ3ooBnd1sfRzeAxjg",
  authDomain: "ntflix-clone-74951.firebaseapp.com",
  projectId: "ntflix-clone-74951",
  storageBucket: "ntflix-clone-74951.appspot.com",
  messagingSenderId: "724912161512",
  appId: "1:724912161512:web:f6a4451d1c8eeb97b83f5d"
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }