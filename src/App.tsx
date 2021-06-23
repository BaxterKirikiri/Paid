import React, { useEffect } from 'react';
import firebase from 'firebase';
import * as Firestore from './services/firebaseConfig';
import './App.css';

interface IPayeeInfo{
  AmountPaid: number,
  LastPaid: string,
  WeeklyRate: number,
  WeeksPaid: number
}

var PayeeInfoConverter = {
  toFirestore: (data: IPayeeInfo) => data,
  fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) => {
    const data = snapshot.data(options);
    return data as IPayeeInfo;
  }
}

function App() {
  const [payeeDoc, setPayeeDoc] = React.useState<any | undefined>();
  const payee = "Blaine";

  useEffect(() => {
    if (!payeeDoc) {
      Firestore.getPayee(payee, PayeeInfoConverter).then(
        (doc) => {
          if (doc.exists) {
            var payeeInfo = doc.data() as IPayeeInfo;
            setPayeeDoc(payeeInfo);
          } else {
            console.log("No such payee");
          }
        }
      ).catch((error) => {
        console.log("Error getting document:", error)
      })
    }
  }, [payeeDoc]);

  const handlePayment = (weeks: number) => () => {
    setPayeeDoc((prevState: IPayeeInfo) => {
      return {
        ...prevState,
        AmountPaid: prevState.AmountPaid + (prevState.WeeklyRate * weeks),
        LastPaid: Date().toLocaleString(),
        WeeksPaid: prevState.WeeksPaid + weeks
      }
    });
  };

  const handleWorked = () => {
    setPayeeDoc((prevState: IPayeeInfo) => {
      return {
        ...prevState,
        WeeksPaid: prevState.WeeksPaid - 1
      }
    });
  }

  const handleWeeklyRate = (e: React.FormEvent<HTMLInputElement>) => {
    setPayeeDoc((prevState: IPayeeInfo) => {
      return {
        ...prevState,
        WeeklyRate: Number(e.currentTarget.value)
      }
    });
  }

  useEffect(() => {
    if (payeeDoc) {
      Firestore.updatePayeeDoc(payee, payeeDoc, PayeeInfoConverter);
    }
  }, [payeeDoc])

  return (
    <div>
      {!payeeDoc && <h1>Loading...</h1>}
      {payeeDoc && <div>
        <h1>Current Payee:{payee}</h1>
        <h1>Ammount Paid:{payeeDoc.AmountPaid}</h1>
        <h1>Weeks Paid:{payeeDoc.WeeksPaid}</h1>
        <h1>Last Paid:{payeeDoc.LastPaid}</h1>
        <input type="number" value={payeeDoc.WeeklyRate} onChange={e => handleWeeklyRate(e)}></input>
        <button onClick={handlePayment(2)}>Pay For Two Weeks</button>
        <button onClick={handleWorked}>Confirm Worked</button>
      </div>}
    </div>
  );
}

export default App;
