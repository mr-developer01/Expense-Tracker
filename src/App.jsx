import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import { uid } from "uid";

const App = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [filterExpense, setFilterExpense] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);

  console.log(expenseData)
  console.log(filterExpense)
  

  const desc = useRef(null);
  const expType = useRef(null);
  const amount = useRef(null);

  const submitExpance = (e) => {
    e.preventDefault();
    const newExpense = {
      id: uid(),
      descData: desc.current.value,
      expTypeData: expType.current.value.toLowerCase(),
      amountData: Number(amount.current.value),
    };

    setExpenseData((prevData) => [...prevData, newExpense]);
    setFilterExpense((prevData) => [...prevData, newExpense]);
    desc.current.value = "";
    amount.current.value = "";
    expType.current.value = "";
  };

  useEffect(() => {
    const storedData = localStorage.getItem("expenses");
    if (storedData) {
      setExpenseData(JSON.parse(storedData));
      setFilterExpense(JSON.parse(storedData))
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
    setFilterExpense(newData);
    setSelectedExpense(null)
  };

  const handleEdit = (id) => {
    
    const newData = expenseData.map((data) => {
      if (data.id === id) {
        data.descData = "AAAAA";
        data.amountData = 12;
      }
      return data;
    });
    setExpenseData(newData);
  };

  const handleChange = (value) => {
    setSelectedExpense(value);

    if (value === "1") {
      const filt = expenseData.filter((data) => {
        return data?.expTypeData === "travel";
      });
      setFilterExpense(filt)
    }

    if (value === "2") {
      const filt = expenseData.filter((data) => {
        return data?.expTypeData === "cloth";
      });
      setFilterExpense(filt)
    }

    if (value === "3") {
      const filt = expenseData.filter((data) => {
        return data?.expTypeData === "food";
      });
      setFilterExpense(filt)
    }

    if (value === "4") {
      setFilterExpense(expenseData)
    }
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
              <input
                ref={desc}
                id="desc"
                type="text"
                placeholder="Expense Description"
              />
            </div>
            <div className="amount flex">
              <label htmlFor="expType">Expense Type</label>
              <input
                ref={expType}
                id="expType"
                type="text"
                placeholder="cloth, travel or food"
              />
            </div>
            <div className="amount flex">
              <label htmlFor="amt">Amount</label>
              <input
                ref={amount}
                id="amt"
                type="number"
                step="any"
                placeholder="Add expense amount"
              />
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
              {filterExpense.map((data) => (
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
              <label htmlFor="travel">Travel Expenses</label>
              <input
                checked={selectedExpense === "1"}
                onChange={() => handleChange("1")}
                id="travel"
                value="1"
                type="checkbox"
              />
            </div>
            <div className="lbl-check">
              <label htmlFor="cloth">Cloth Expenses</label>
              <input
                checked={selectedExpense === "2"}
                onChange={() => handleChange("2")}
                id="cloth"
                value="2"
                type="checkbox"
              />
            </div>
            <div className="lbl-check">
              <label htmlFor="food">Food Expenses</label>
              <input
                checked={selectedExpense === "3"}
                onChange={() => handleChange("3")}
                id="food"
                value="3"
                type="checkbox"
              />
            </div>
            <div className="lbl-check">
              <label htmlFor="food">All Expenses</label>
              <input
                checked={selectedExpense === "4"}
                onChange={() => handleChange("4")}
                id="all"
                value="4"
                type="checkbox"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
