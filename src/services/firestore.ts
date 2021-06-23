import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4WQQ60kzra8fNK1VzeNVVjxA39wnt1k8",
  authDomain: "paid-2493d.firebaseapp.com",
  projectId: "paid-2493d",
  appId: "1:901420510016:web:24e375eb32155fa90868a5"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export type Payee = {
  AmountPaid: number,
  LastPaid: string,
  WeeklyRate: number,
  WeeksPaid: number
}
export const getPayeeStream = (payeeName: string, observer: any) => {
  return db.collection("Payees").doc(payeeName).onSnapshot(observer);
}
export const updatePayee = (payeeName: string, payeeDoc: Payee) => {
  return db.collection("Payees").doc(payeeName).set(payeeDoc);
}
export default firebase;

