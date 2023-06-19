import { cert, initializeApp } from "firebase-admin/app";
import path from "path";
import dotenv from "dotenv";
import { firestore } from "firebase-admin";

dotenv.config();

initializeApp({
  credential: cert(path.join(__dirname, process.env.FIREBASE_FILE as string)),
});

const db = firestore();

export default db;
