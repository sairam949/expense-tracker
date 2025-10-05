import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { downloadCSV } from './utils/downloadCSV';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('expenses');
    if (stored) setExpenses(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const startEdit = (expense) => {
    setEditingExpense(expense);
  };

  const updateExpense = (updated) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
    setEditingExpense(null);
  };

  const getMonthlyTotal = () => {
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* 👇 This is where your JSX snippet goes */}
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editingExpense={editingExpense}
      />
      <h2>This Month's Total: ₹{getMonthlyTotal().toFixed(2)}</h2>
      <button onClick={() => downloadCSV(expenses)}>Download CSV</button>
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={startEdit}
      />
    </div>
  );
};

export default App;