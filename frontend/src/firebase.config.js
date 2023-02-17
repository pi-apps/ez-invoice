import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as auth from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCm7aPtVaCbhG8s-qdfAAlInUXL2tZTMFs",
  authDomain: "ez-invoice-136a8.firebaseapp.com",
  projectId: "ez-invoice-136a8",
  storageBucket: "ez-invoice-136a8.appspot.com",
  messagingSenderId: "561851609460",
  appId: "1:561851609460:web:6078e1bdebbbaa05283c21",
};
// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
provider.addScope("https://www.googleapis.com/auth/drive.file");
export const SignInWithGoogle = async () => {
  const result = await signInWithPopup(auth.getAuth(), provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  return token;
};
