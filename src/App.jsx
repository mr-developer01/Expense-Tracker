import React, { useRef } from "react";
import "./App.css";

const App = () => {
  const desc = useRef(null);
  const amount = useRef(null);

  const submitExpance = (e) => {
    e.preventDefault()
    console.log(desc.current.value)
    console.log(amount.current.value)
    console.log("Working...")
    desc.current.value = ""
    amount.current.value = ""
  }
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
