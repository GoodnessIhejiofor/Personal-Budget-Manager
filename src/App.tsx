import React, { useReducer } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

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

type State = {
  expenses: Expense[];
  budgetLimits: Budget[];
};

type Action =
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'SET_BUDGET_LIMIT'; payload: Budget };

const initialState: State = {
  expenses: [],
  budgetLimits: [
    { category: 'Food', limit: 200 },
    { category: 'Transport', limit: 100 },
  ],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'SET_BUDGET_LIMIT':
      return {
        ...state,
        budgetLimits: state.budgetLimits.map((budget) =>
          budget.category === action.payload.category
            ? { ...budget, limit: action.payload.limit }
            : budget
        ),
      };
    default:
      return state;
  }
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-container">
      <h1>Personal Budget Manager</h1>
      <ExpenseForm dispatch={dispatch} />
      <ExpenseList expenses={state.expenses} />
      <ExpenseSummary expenses={state.expenses} budgetLimits={state.budgetLimits} />
    </div>
  );
};

export default App;
