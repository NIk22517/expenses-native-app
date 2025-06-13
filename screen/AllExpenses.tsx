import { useEffect } from "react";
import { ExpensesList } from "../components/ExpensesList";
import { useExpenseState } from "../store/Expense";
import { fetchAndDispatchExpenses } from "../helper/ExpenseUtils";

const AllExpenses = () => {
  const { state, dispatch } = useExpenseState();
  useEffect(() => {
    if (state.expenses.length === 0) {
      fetchAndDispatchExpenses(dispatch);
    }
  }, []);
  return <ExpensesList expenses={state.expenses} />;
};

export default AllExpenses;
