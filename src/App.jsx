import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { uid } from "uid";

const App = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const desc = useRef(null);
  const amount = useRef(null);

  const submitExpance = (e) => {
    e.preventDefault();
    const newExpense = {
      id: uid(),
      descData: desc.current.value,
      amountData: Number(amount.current.value),
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

  const sumExpenses = expenseData.reduce((acc, data) => {
    return acc + data.amountData;
  }, 0);

  const handleDelete = (id) => {
    const newData = expenseData.filter((data) => {
      console.log(data)
      return data.id !== id;
    })
    setExpenseData(newData)
  }

  return (
    <div className="main">
      <h1>Total Expenses : Rs {sumExpenses}</h1>
      <div className="add-data">
        <h2>Add Expense</h2>
        <form onSubmit={submitExpance}>
          <div className="inp-wrp">
            <div className="description flex">
              <label htmlFor="desc">Description</label>
              <input ref={desc} id="desc" type="text" />
            </div>
            <div className="amount flex">
              <label htmlFor="amt">Amount</label>
              <input ref={amount} id="amt" type="number" />
            </div>
          </div>
          <div className="submit-btn">
            <input type="submit" />
          </div>
        </form>
      </div>
      {expenseData.length > 0 && (
        <div className="expense-table">
          <h2>Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((data) => (
                <tr key={data.id}>
                  <th>{data.descData}</th>
                  <th>{data.amountData}</th>
                  <th>
                    <button className="cta-btn">Edit</button>
                  </th>
                  <th>
                    <button onClick={() => handleDelete(data.id)} className="cta-btn">Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
