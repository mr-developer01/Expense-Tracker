import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { uid } from "uid";

const App = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [filterExpense, setFilterExpense] = useState(expenseData);
  console.log(filterExpense, "FilterArr");

  const desc = useRef(null);
  const expType = useRef(null);
  const amount = useRef(null);

  // console.log(expType)

  const submitExpance = (e) => {
    e.preventDefault();
    const newExpense = {
      id: uid(),
      descData: desc.current.value,
      expTypeData: expType.current.value.toLowerCase(),
      amountData: Number(amount.current.value),
    };

    console.log(newExpense);
    setExpenseData((prevData) => [...prevData, newExpense]);
    desc.current.value = "";
    amount.current.value = "";
    expType.current.value = "";
  };

  useEffect(() => {
    const storedData = localStorage.getItem("expenses");
    console.log(storedData);  
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
      return data.id !== id;
    });
    setExpenseData(newData);
  };

  const handleEdit = (id) => {
    // console.log(id);
    const newData = expenseData.map((data) => {
      if (data.id === id) {
        // console.log("abc");
        data.descData = "AAAAA";
        data.amountData = 12;
      }
      return data;
    });
    // console.log(newData);
    setExpenseData(newData);
  };

  return (
    <div className="main">
      <h1>Total Expenses : Rs {sumExpenses}</h1>
      <div className="add-data">
        <h2>Add Expense</h2>
        <form onSubmit={submitExpance}>
          <div className="inp-wrp">
            <div className="description flex">
              <label htmlFor="desc">Description</label>
              <input ref={desc} id="desc" type="text" placeholder="Expense Description" />
            </div>
            <div className="amount flex">
              <label htmlFor="expType">Expense Type</label>
              <input ref={expType} id="expType" type="text" placeholder="cloth, travel or food" />
            </div>
            <div className="amount flex">
              <label htmlFor="amt">Amount</label>
              <input ref={amount} id="amt" type="number" step="any" placeholder="Add expense amount" />
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
                    <button
                      onClick={() => handleEdit(data.id)}
                      className="cta-btn"
                    >
                      Edit
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="cta-btn"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-2">
            <div className="lbl-check">
              <label htmlFor="travel">Travel expense</label>
              <input id="travel" value="1" type="checkbox" />
            </div>
            <div className="lbl-check">
              <label htmlFor="cloth">Cloth expense</label>
              <input id="cloth" value="1" type="checkbox" />
            </div>
            <div className="lbl-check">
              <label htmlFor="food">Food expense</label>
              <input id="food" value="1" type="checkbox" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
