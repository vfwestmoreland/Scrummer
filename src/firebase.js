import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAXVdq0mpI7LTuJC_8OxqBKG9maatl3SZc",
  authDomain: "getupstandup-5619a.firebaseapp.com",
  databaseURL: "https://getupstandup-5619a-default-rtdb.firebaseio.com",
  projectId: "getupstandup-5619a",
  storageBucket: "getupstandup-5619a.appspot.com",
  messagingSenderId: "444488946678",
  appId: "1:444488946678:web:5067b63ade30050debedd7"
};


const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth(app);
export default app