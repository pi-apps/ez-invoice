import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as auth from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCHBckuzc55tikK1oMSvl9UfPCF_hQCS5k",
  authDomain: "ez-invoice-pibridge.firebaseapp.com",
  projectId: "ez-invoice-pibridge",
  storageBucket: "ez-invoice-pibridge.appspot.com",
  messagingSenderId: "61845936254",
  appId: "1:61845936254:web:0ea87ba08f06322c22202f"
};
// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
provider.addScope("https://www.googleapis.com/auth/drive.file");
export const SignInWithGoogle = async () => {
  console.log('provider', provider)
  const result = await signInWithPopup(auth.getAuth(), provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  return token;
};
