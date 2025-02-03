import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [expenseData, setExpenseData] = useState([]);
  console.log(expenseData);
  const desc = useRef(null);
  const amount = useRef(null);

  const submitExpance = (e) => {
    e.preventDefault();
    const newExpense = {
      descData: desc.current.value,
      amountData: amount.current.value,
    };
    setExpenseData((prevData) => [...prevData, newExpense]);
    desc.current.value = "";
    amount.current.value = "";
  };

  useEffect(() => {
    const storedData = localStorage.getItem("expenses");
    if (storedData) {
      setExpenseData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (expenseData.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenseData));
    }
  }, [expenseData]);

  return (
    <div className="main">
      <h1>Total Expenses : Rs 15000</h1>
      <div className="add-data">
        <h2>Add Expense</h2>
        <form onSubmit={submitExpance}>
          <div className="inp-wrp">
            <div className="description flex">
              <label htmlFor="desc">Description</label>
              <input ref={desc} type="text" />
            </div>
            <div className="amount flex">
              <label htmlFor="desc">Amount</label>
              <input ref={amount} type="number" />
            </div>
          </div>
          <div className="submit-btn">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
