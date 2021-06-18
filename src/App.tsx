import React, { useEffect } from 'react';
import * as Firestore from './services/firebaseConfig';
import './App.css';

function App() {
  const [payee, setPayee] = React.useState("Blaine");
  const [payeeDoc, setPayeeDoc] = React.useState({
    AmountPaid: 0,
    LastPaid: "Never Paid",
    WeeklyRate: 0,
    WeeksPaid: 0
  });

  const handlePayment = (weeks : number) => () => {
    setPayeeDoc({
      AmountPaid: payeeDoc.AmountPaid + (payeeDoc.WeeklyRate * weeks),
      LastPaid: Date().toLocaleString(),
      WeeklyRate: payeeDoc.WeeklyRate,
      WeeksPaid: payeeDoc.WeeksPaid + weeks
    });
  };

  const handleWorked = () => {
    setPayeeDoc({
      AmountPaid: payeeDoc.AmountPaid,
      LastPaid: payeeDoc.LastPaid,
      WeeklyRate: payeeDoc.WeeklyRate,
      WeeksPaid: payeeDoc.WeeksPaid - 1
    });
  }

  const handleWeeklyRate = (e: React.FormEvent<HTMLInputElement>) => {
    setPayeeDoc({
      AmountPaid: payeeDoc.AmountPaid,
      LastPaid: payeeDoc.LastPaid,
      WeeklyRate: Number(e.currentTarget.value),
      WeeksPaid: payeeDoc.WeeksPaid
    });
  }

  useEffect(() => {
    Firestore.updatePayee(payee, payeeDoc); 
  }, [payeeDoc]);

  return (
    <div>
      <h1>Current Payee:{payee}</h1>
      <h1>Ammount Paid:{payeeDoc.AmountPaid}</h1>
      <h1>Weeks Paid:{payeeDoc.WeeksPaid}</h1>
      <h1>Last Paid:{payeeDoc.LastPaid}</h1>
      <input type="number" value={payeeDoc.WeeklyRate} onChange={e => handleWeeklyRate(e) }></input>
      <button onClick={handlePayment(2)}>Pay For Two Weeks</button>
      <button onClick={handleWorked}>Confirm Worked</button>
    </div>
  );
}

export default App;
