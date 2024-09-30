import React from 'react';

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
};

type Props = {
  expenses: Expense[];
};

const ExpenseList: React.FC<Props> = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - ${expense.amount} - {expense.date} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
