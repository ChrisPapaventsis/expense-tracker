import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [label, setLabel] = useState("");

  const addTransaction = () => {
    if (!amount || !label) return;
    setTransactions([
      ...transactions,
      { type, amount: parseFloat(amount), label },
    ]);
    setAmount("");
    setLabel("");
  };

  const calculateNet = () =>
    transactions.reduce(
      (acc, t) => (t.type === "income" ? acc + t.amount : acc - t.amount),
      0
    );

  return (
    <div className="container">
      <h1 className="header">Expense Tracker</h1>
      <div className="form">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="select"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label"
          className="input"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="input"
        />
        <button onClick={addTransaction} className="button">
          Add
        </button>
      </div>
      <h2 className="subheader">Transactions</h2>
      <ul className="list">
        {transactions.map((t, index) => (
          <li
            key={index}
            className={`list-item ${
              t.type === "income" ? "income" : "expense"
            }`}
          >
            {t.type}: {t.label} - ${t.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2 className="net">
        Net:{" "}
        <span className={calculateNet() >= 0 ? "positive" : "negative"}>
          ${calculateNet().toFixed(2)}
        </span>
      </h2>
    </div>
  );
}

export default App;
