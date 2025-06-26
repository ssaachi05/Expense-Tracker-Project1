import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  // Using Localstorage
  // const [transactions, setTransactions] = useState(
  //   JSON.parse(localStorage.getItem("transactions")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("transactions", JSON.stringify(transactions));
  // }, [transactions]);

  // const addTransaction = (transaction) => {
  //   setTransactions([{ ...transaction, id: Date.now() }, ...transactions]);
  // };

  // const deleteTransaction = (id) => {
  //   setTransactions(transactions.filter((t) => t.id !== id));
  // };

  // const editTransaction = (id, updatedTransaction) => {
  //   setTransactions(
  //     transactions.map((t) => (t.id === id ? { ...updatedTransaction, id } : t))
  //   );
  // };

  // Using MongoDB
  
  return (
    <Router>
      <Navbar />
      <h1 className="main-heading">Personal Finance Tracker</h1>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route
          path="/transaction"
          element={
            <Transactions/>
          }
        />
        <Route
          path="/dashboard"
          element={<Dashboard  />}
        />
      </Routes>
    </Router>
  );
}

export default App;
