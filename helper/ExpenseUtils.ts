import { Expenses, DispatchType } from "../store/Expense";
import Expense from "../services/expenses";

export const fetchAndDispatchExpenses = async (dispatch: DispatchType) => {
  const result = await Expense.getExpense();
  if ("error" in result) {
    console.log("error", result);
  } else {
    const data: Expenses[] = Object.keys(result).map((el) => ({
      _id: el,
      amount: result[el]?.amount ?? "",
      category: result[el]?.category ?? "",
      date: result[el]?.date ?? "",
      description: result[el]?.description ?? "",
    }));

    dispatch({
      type: "ADD_EXPENSE",
      payload: data,
    });
  }
};
