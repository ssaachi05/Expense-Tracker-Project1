import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const TransactionList = ({ transactions, deleteTransaction, editTransaction }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [customCategories, setCustomCategories] = useState([]);

  // Reverse the array to show most recently added items first
  const recentTransactions = transactions ? [...transactions].reverse() : [];

  // Default categories (same as form)
  const defaultCategories = ["General", "Food", "Shopping", "Bills", "Entertainment", "Other"];

  // Loading custom categories from localStorage
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("customCategories")) || [];
    setCustomCategories(storedCategories);
  }, []);

  // All available categories (default + custom)
  const allCategories = [...defaultCategories, ...customCategories];

  // Function to format transaction type
  const formatTransactionType = (type) => {
    if (type.toLowerCase() === 'expense') {
      return 'Expense';
    }
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  // Start editing a transaction
  const startEditing = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Save edited transaction
  const saveEdit = (id) => {
    editTransaction(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="sub-heading-medium">Transaction List</CardTitle>
      </CardHeader>
      <CardContent>
        {(!transactions || transactions.length === 0) ? (
          <p className="no-transactions">No transactions found.</p>
        ) : (
          <div className="transactions-container">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`transaction-item ${transaction.type}`}
              >
                <div className="transaction-header sub-container">
                  <span className="amount font-bold">
                    {editingId === transaction.id ? (
                      <input
                        type="number"
                        value={editForm.amount || ''}
                        onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                        style={{ width: '80px', padding: '4px 6px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    ) : (
                      `₹${Math.abs(transaction.amount).toFixed()}`
                    )}
                  </span>
                  <span className={`type ${transaction.type} font-semibold`}>
                    {editingId === transaction.id ? (
                      <select
                        value={editForm.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        style={{ padding: '4px 6px', fontSize: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    ) : (
                      formatTransactionType(transaction.type)
                    )}
                  </span>
                </div>
                <div className="transaction-details">
                  <p className="description font-semibold">
                    {editingId === transaction.id ? (
                      <input
                        type="text"
                        value={editForm.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        style={{ width: '100%', padding: '4px 6px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
                      />
                    ) : (
                      transaction.description
                    )}
                  </p>
                  <p className="category text-sm text-muted-foreground font-semibold">
                    Category: {editingId === transaction.id ? (
                      <select
                        value={editForm.category || 'General'}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        style={{ 
                          width: '140px', 
                          padding: '4px 6px', 
                          fontSize: '12px', 
                          marginLeft: '5px',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          backgroundColor: 'white'
                        }}
                      >
                        {allCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    ) : (
                      transaction.category
                    )}
                  </p>
                </div>
                <div className="transaction-actions" style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                  {editingId === transaction.id ? (
                    <>
                      <button 
                        className="save-button" 
                        onClick={() => saveEdit(transaction.id)}
                        style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        ✓ Save
                      </button>
                      <button 
                        className="cancel-button" 
                        onClick={cancelEditing}
                        style={{ fontSize: "12px", padding: "6px 12px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                      >
                        ✗ Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        className="edit-button" 
                        onClick={() => startEditing(transaction)}
                        style={{ fontSize: "12px", padding: "6px 12px", cursor: "pointer" }}
                      >
                        ✏ Edit
                      </button>
                      <button 
                        className="delete-button" 
                        onClick={() => deleteTransaction(transaction.id)}
                        style={{ fontSize: "12px", padding: "6px 12px", cursor: "pointer" }}
                      >
                        🗑 Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionList;
