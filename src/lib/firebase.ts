import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, hasFirebaseConfig } from "./firebase-config";
export const firebaseApp = hasFirebaseConfig
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
