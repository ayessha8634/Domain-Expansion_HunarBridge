import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app: FirebaseApp | undefined;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const isConfigValid = firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key';

if (isConfigValid) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
  } catch (e) {
    console.error("Firebase init error:", e);
    // Fallback to mocks
    db = {} as Firestore;
    auth = { onAuthStateChanged: (cb: any) => { cb(null); return () => {}; } } as any;
    storage = {} as FirebaseStorage;
  }
} else {
  console.warn("HunarBridge: Running in MOCK mode. Firebase keys missing.");
  app = undefined;
  db = {} as Firestore;
  auth = { onAuthStateChanged: (cb: any) => { cb(null); return () => {}; } } as any;
  storage = {} as FirebaseStorage;
}

export { db, auth, storage };
export default app;
