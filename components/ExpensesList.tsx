import { Alert, FlatList, Pressable, StyleSheet, View } from "react-native";
import { colorPalette } from "../global/ColorCode";
import { Typography } from "./Typograhy";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DispatchType, Expenses, useExpenseState } from "../store/Expense";
import { Swipeable } from "react-native-gesture-handler";
import Button from "./Button";
import Expense from "../services/expenses";
import { StackType } from "../Routes";
import Icon from "./Icon";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

type NavType = NavigationProp<StackType, "add_expenses">;

const renderRightActions = (id: string, dispatch: DispatchType) => {
  const onDelete = async (id: string) => {
    await Expense.deleteExpense(id);
    dispatch({
      type: "REMOVE_EXPENSE",
      payload: id,
    });
  };

  return (
    <View style={styles.rightActionContainer}>
      <Button
        style={{
          minWidth: 100,
        }}
        variant="delete"
        content={<Icon name="delete" color={"white"} />}
        onPress={() => {
          Alert.alert(
            "Delete Expense",
            "Are you sure you want to delete this expense?",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => onDelete(id),
              },
            ]
          );
        }}
      />
    </View>
  );
};

export const ExpensesList = ({ expenses }: { expenses: Expenses[] }) => {
  const navigation = useNavigation<NavType>();
  const { dispatch } = useExpenseState();

  return (
    <FlatList
      style={styles.container}
      data={expenses}
      renderItem={({ item }) => {
        return (
          <Swipeable
            renderRightActions={() => renderRightActions(item._id, dispatch)}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("add_expenses", {
                  action: "edit",
                  _id: item._id,
                });
              }}
            >
              <View style={styles.expenseItem}>
                <View>
                  <Typography content={item.category} variant="h6" />
                  <Typography content={item.description} />
                  <Typography content={formatDate(item.date)} />
                </View>

                <Typography
                  content={`$${item.amount}`}
                  align="center"
                  variant="h6"
                  style={styles.amountText}
                />
              </View>
            </Pressable>
          </Swipeable>
        );
      }}
      keyExtractor={(item) => item._id}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.error.text,
  },
  rightActionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  expenseItem: {
    padding: 20,
    backgroundColor: colorPalette.primary.text,
    margin: 10,
    borderRadius: 20,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  amountText: {
    backgroundColor: colorPalette.secondary.text,
    minWidth: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: colorPalette.primary.text,
    fontWeight: "bold",
  },
});
