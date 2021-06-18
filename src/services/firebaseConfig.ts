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

  export const updateAmountPaid = (name : string, amountPaid: number) => {
      return db.collection("Payees").doc(name).update({
          AmountPaid: amountPaid
      });
  }
  export const updateWeeklyRate = (name : string, weeklyRate: number) => {
    return db.collection("Payees").doc(name).update({
        WeeklyRate: weeklyRate
    });
  }
  export const updateWeeksPaid = (name : string, weeksPaid: number) => {
    return db.collection("Payees").doc(name).update({
        WeeksPaid: weeksPaid
    });
  }
  export const updateLastPaid = (name : string, lastPaid: string) => {
    return db.collection("Payees").doc(name).update({
        LastPaid: lastPaid
    });
  }
  
  export default firebase;

