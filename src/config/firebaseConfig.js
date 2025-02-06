import { initializeApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {
    getAuth,
    GoogleAuthProvider,

  } from "firebase/auth";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
  } from "firebase/firestore"; // Correct imports

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "optim-50a60.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

//optim-50a60.appspot.com
//process.env.REACT_APP_FIREBASE_STORAGE_BUCKET

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the existing app
}


export const storage = getStorage(app); // Initialize storage
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentMultipleTabManager(),
    }),
  });
  
  export const authType = getAuth();
  export const provider = new GoogleAuthProvider();


  export default app;

