import React from 'react';

const ExpenseItem = ({ expense, onDelete, onEdit }) => {
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <li className="expense-item">
      <div>
        <strong>{expense.title}</strong><br />
        <small>{formattedDate}</small>
      </div>
      <span>₹{expense.amount.toFixed(2)}</span>
      <div>
        <button onClick={() => onEdit(expense)}>✏️</button>
        <button onClick={() => onDelete(expense.id)}>🗑️</button>
      </div>
    </li>
  );
};
export default ExpenseItem;