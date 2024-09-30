import React from 'react';
import { Pie } from 'react-chartjs-2';

type Expense = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
};

type Budget = {
  category: string;
  limit: number;
};

type Props = {
  expenses: Expense[];
  budgetLimits: Budget[];
};

const ExpenseSummary: React.FC<Props> = ({ expenses, budgetLimits }) => {
  const expenseByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(expenseByCategory),
    datasets: [
      {
        data: Object.values(expenseByCategory),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const checkBudget = (category: string) => {
    const spent = expenseByCategory[category] || 0;
    const budget = budgetLimits.find((b) => b.category === category);

    // Check if budget is defined before accessing its properties
    if (budget) {
      return spent >= budget.limit ? 'budget-alert' : '';
    }
    
    // If budget is undefined, return an empty string
    return '';
  };

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      <Pie data={data} />
      {budgetLimits.map((budget) => (
        <div key={budget.category} className={checkBudget(budget.category)}>
          {budget.category}: ${expenseByCategory[budget.category] || 0} / ${budget.limit}
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;
