import { useEffect, useMemo } from "react";
import { ExpensesList } from "../components/ExpensesList";
import { useExpenseState } from "../store/Expense";
import { View } from "react-native";
import { Typography } from "../components";
import { colorPalette } from "../global/ColorCode";
import { fetchAndDispatchExpenses } from "../helper/ExpenseUtils";

const RecentExpense = () => {
  const { state, dispatch } = useExpenseState();

  const total = useMemo(() => {
    let amount = 0;
    state.expenses.forEach((el) => {
      amount += Number(el.amount);
    });
    return amount;
  }, [state.expenses]);

  useEffect(() => {
    if (state.expenses.length === 0) {
      fetchAndDispatchExpenses(dispatch);
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 5,
          backgroundColor: colorPalette.primary.dark,
        }}
      >
        <Typography
          content={"Total Expense"}
          style={{
            color: colorPalette.primary.text,
          }}
        />
        <Typography
          content={`$ ${total}`}
          style={{
            color: colorPalette.primary.text,
          }}
        />
      </View>
      <ExpensesList expenses={state.expenses} />
    </View>
  );
};

export default RecentExpense;
