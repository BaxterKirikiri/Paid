import React, { useEffect } from 'react';
import * as Firestore from './services/firebaseConfig';
import './App.css';

function App() {
  const Payee = "Blaine";
  const [amountPaid, setAmountPaid] = React.useState(0);
  const [weeksPaid, setWeeksPaid] = React.useState(0);
  const [lastPaid, setLastPaid] = React.useState("Never Paid");
  const [weeklyRate, setWeeklyRate] = React.useState(0);

  const handlePayment = (weeks : number) => () => {
    setAmountPaid(amountPaid + (weeklyRate * weeks));
    setWeeksPaid(weeksPaid + weeks);
    setLastPaid(Date().toLocaleString());
  };

  const handleWorked = () => {
    setWeeksPaid(weeksPaid - 1);
  }

  const handleWeeklyRate = (e: React.FormEvent<HTMLInputElement>) => {
    setWeeklyRate(Number(e.currentTarget.value));
    
  }

  useEffect(() => {
    Firestore.updateAmountPaid(Payee, amountPaid);
    Firestore.updateWeeksPaid(Payee, weeksPaid);
    Firestore.updateLastPaid(Payee, lastPaid)
    Firestore.updateWeeksPaid(Payee, weeksPaid);
    Firestore.updateWeeklyRate(Payee, weeklyRate);
  }, [amountPaid, weeklyRate, weeksPaid, lastPaid]);

  return (
    <div>
      <h1>Ammount Paid:{amountPaid}</h1>
      <h1>Weeks Paid:{weeksPaid}</h1>
      <h1>Last Paid:{lastPaid}</h1>
      <input type="number" value={weeklyRate} onChange={e => handleWeeklyRate(e) }></input>
      <button onClick={handlePayment(2)}>Pay For Two Weeks</button>
      <button onClick={handleWorked}>Confirm Worked</button>
    </div>
  );
}

export default App;
