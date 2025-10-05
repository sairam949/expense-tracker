import React, { useState } from 'react';
import { useEffect } from 'react';

const ExpenseForm = ({ onAdd, onUpdate, editingExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setDate(new Date(editingExpense.date).toISOString().split('T')[0]);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;

    const expenseData = {
      id: editingExpense ? editingExpense.id : Date.now(),
      title,
      amount: parseFloat(amount),
      date: new Date(date)
    };

    editingExpense ? onUpdate(expenseData) : onAdd(expenseData);
    setTitle('');
    setAmount('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit">
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};
export default ExpenseForm;
