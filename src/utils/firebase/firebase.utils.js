import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC23fQkdqgFHcuVKwAJkB5A6zpOwSKYmm8",
  authDomain: "crwn-clothing-db-40378.firebaseapp.com",
  projectId: "crwn-clothing-db-40378",
  storageBucket: "crwn-clothing-db-40378.appspot.com",
  messagingSenderId: "975245779569",
  appId: "1:975245779569:web:b1a57d4edab54f530731d0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user : ", error);
    }
  }

  return userDocRef;

  //if user data does not exist
  //create / set the document with the date from userAuth in my collection
  // if user data exists
  // return userDocRef
};
