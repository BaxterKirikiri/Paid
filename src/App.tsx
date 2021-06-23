import React, { useEffect } from 'react';
import { updatePayee, getPayeeStream, Payee } from './services/firestore';
import './App.css';

function App() {
  const [payeeDoc, setPayeeDoc] = React.useState<Payee | undefined>(undefined);
  const payeeName = "Blaine";

  useEffect(() => {
    const observer = {
      next: (snapshot: any) => {
        setPayeeDoc(snapshot.data() as Payee);
      }
    }
    const unsubscribe = getPayeeStream(payeeName, observer);
    return unsubscribe;
  }, [])

  const handlePayment = (weeks: number) => () => {
    const updatedPayee = {
      ...payeeDoc,
      AmountPaid: payeeDoc ? payeeDoc.AmountPaid + (payeeDoc.WeeklyRate * weeks) : 0,
      LastPaid: Date().toLocaleString(),
      WeeksPaid: payeeDoc ? payeeDoc.WeeksPaid + weeks : 0
    } as Payee;
    updatePayee(payeeName, updatedPayee);
  };

  const handleWorked = () => {
    const updatedPayee = {
      ...payeeDoc,
      WeeksPaid: payeeDoc ? payeeDoc.WeeksPaid - 1 : 0
    } as Payee;
    updatePayee(payeeName, updatedPayee);
  }

  const handleWeeklyRate = (e: React.FormEvent<HTMLInputElement>) => {
    const updatedPayee = {
      ...payeeDoc,
      WeeklyRate: Number(e.currentTarget.value)
    } as Payee;
    updatePayee(payeeName, updatedPayee);
  }

  return (
    <div>
      {!payeeDoc && <h1>Loading...</h1>}
      {payeeDoc && <div>
        <h1>Current Payee:{payeeName}</h1>
        <h1>Ammount Paid:{payeeDoc.AmountPaid}</h1>
        <h1>Weeks Paid:{payeeDoc.WeeksPaid}</h1>
        <h1>Last Paid:{payeeDoc.LastPaid}</h1>
        <input type="number" value={payeeDoc.WeeklyRate} onChange={handleWeeklyRate}></input>
        <button onClick={handlePayment(2)}>Pay For Two Weeks</button>
        <button onClick={handleWorked}>Confirm Worked</button>
      </div>}
    </div>
  );
}

export default App;
