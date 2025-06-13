import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useMemo,
  useContext,
} from "react";

export type Expenses = {
  _id: string;
  amount: string;
  category: string;
  date: string;
  description: string;
};

interface ExpenseState {
  expenses: Expenses[];
}

type Action =
  | { type: "ADD_EXPENSE"; payload: Expenses[] }
  | { type: "ADD_SINGLE_EXPENSE"; payload: Expenses }
  | { type: "REMOVE_EXPENSE"; payload: string }
  | { type: "UPDATE_EXPENSE"; payload: { id: string; data: Expenses } };

const initialState: ExpenseState = {
  expenses: [],
};

const expenseReducer = (state: ExpenseState, action: Action): ExpenseState => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...action.payload] };
    case "ADD_SINGLE_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "REMOVE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload.id
            ? { ...expense, ...action.payload.data }
            : expense
        ),
      };
    default:
      return state;
  }
};

export type DispatchType = Dispatch<Action>;

const ExpenseContext = createContext<{
  state: ExpenseState;
  dispatch: DispatchType;
} | null>(null);

const ExpenseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const memory = useMemo(() => {
    return {
      state,
      dispatch,
    };
  }, [state, dispatch]);

  return (
    <ExpenseContext.Provider value={memory}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;

export const useExpenseState = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("Use the provider to use the expense context");
  }
  return context;
};
