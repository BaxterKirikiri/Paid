import React from 'react';
import './App.css';

function App() {
  const [ammountPaid, setAmmountPaid] = React.useState(0);
  const [weeksPaid, setWeeksPaid] = React.useState(0);
  const [lastPaid, setLastPaid] = React.useState("Never Paid");
  const [weeklyRate, setWeeklyRate] = React.useState(0);

  const handlePayment = (weeks : number) => () => {
    setAmmountPaid(ammountPaid + (weeklyRate * weeks));
    setWeeksPaid(weeksPaid + weeks);
    setLastPaid(Date().toLocaleString())
  };

  const handleWorked = () => {
    setWeeksPaid(weeksPaid - 1);
  }

  return (
    <div>
      <h1>Ammount Paid:{ammountPaid}</h1>
      <h1>Weeks Paid:{weeksPaid}</h1>
      <h1>Last Paid:{lastPaid}</h1>
      <input type="number" value={weeklyRate} onChange={e => setWeeklyRate(Number(e.target.value))}></input>
      <button onClick={handlePayment(2)}>Pay For Two Weeks</button>
      <button onClick={handleWorked}>Confirm Worked</button>
    </div>
  );
}

export default App;
