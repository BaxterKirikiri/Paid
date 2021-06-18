import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD4WQQ60kzra8fNK1VzeNVVjxA39wnt1k8",
    authDomain: "paid-2493d.firebaseapp.com",
    projectId: "paid-2493d",
    storageBucket: "paid-2493d.appspot.com",
    messagingSenderId: "901420510016",
    appId: "1:901420510016:web:24e375eb32155fa90868a5"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export const updatePayee = (payeeName: string, payeeDoc: object) => {
      return db.collection("Payees").doc(payeeName).set(payeeDoc);
  }
  export const getPayee = (payeeName: string) => {
      return db.collection("Payees").doc(payeeName).get();
  }
  export default firebase;

