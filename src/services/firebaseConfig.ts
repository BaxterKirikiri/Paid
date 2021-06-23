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

  export const db = firebase.firestore();

  export const updatePayeeDoc = (payeeName: string, payeeDoc: object, converter: any) => {
      return db.collection("Payees").doc(payeeName).withConverter(converter).set(payeeDoc);
  }
  export const getPayee = (payeeName: string, converter: any) => {
      return db.collection("Payees").doc(payeeName).withConverter(converter).get();
  }
  export default firebase;

