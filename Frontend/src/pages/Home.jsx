import React from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

const Home = () => {
  const{ transactions }=useTransactions();
  const navigate = useNavigate();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const balance = income - expenses;

  return (
    <div className="min-h-screen px-4 py-8 text-gray-800">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-600">Income</h2>
          <p className="text-2xl font-bold text-green-600">₹{income}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-600">Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹{expenses}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow text-center">
          <h2 className="text-lg font-semibold text-gray-600">Balance</h2>
          <p className="text-2xl font-bold text-blue-600">₹{balance}</p>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => navigate("/transaction")}
          className="bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
        >
          Add or View Transactions
        </button>
      </div>

      {/* View Transactions List */}
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <div className="grid gap-4">
        {transactions
          .slice(-5)
          .reverse()
          .map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h3 className="text-lg font-medium">{transaction.title}</h3>
                <p className="text-sm text-gray-500">{transaction.category}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-right">
                <p
                  className={`text-xl font-bold ₹ {
                  transaction.type === "income" ? "text-green-600" : "text-red-600"
                }`}
                >
                  ₹{transaction.amount}
                </p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
              </div>
            </div>
          ))}
        {transactions.length === 0 && (
          <p className="text-gray-500 text-center">No transactions yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
