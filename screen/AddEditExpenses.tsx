import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackType } from "../Routes";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { colorPalette } from "../global/ColorCode";
import Expense from "../services/expenses";
import { useExpenseState } from "../store/Expense";

type ExpenseData = {
  category: string;
  date: string;
  amount: string;
  description: string;
};

type Props = NativeStackScreenProps<StackType, "add_expenses">;

const AddEditExpenses = ({ navigation, route }: Props) => {
  const { state, dispatch } = useExpenseState();
  const [data, setData] = useState<ExpenseData>({
    category: "",
    date: "",
    amount: "",
    description: "",
  });

  const [error, setError] = useState<{ [key in keyof ExpenseData]?: string }>(
    {}
  );

  const handleChange = (key: keyof ExpenseData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (error[key]) setError((prev) => ({ ...prev, [key]: "" }));
  };

  const validateFields = () => {
    const newErrors: { [key in keyof ExpenseData]?: string } = {};
    if (!data.category) newErrors.category = "Category is required.";
    if (!data.date) newErrors.date = "Date is required.";
    if (!data.amount || isNaN(Number(data.amount)))
      newErrors.amount = "Amount must be a valid number.";
    if (!data.description) newErrors.description = "Description is required.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    const result = await Expense.addExpense({
      ...data,
    });
    if ("error" in result) {
      console.error("Error adding expense:", result.error);
    } else {
      console.log("Expense added successfully:", result.name);
      dispatch({
        type: "ADD_SINGLE_EXPENSE",
        payload: { _id: result.name, ...data },
      });
      navigation.goBack();
    }
  };

  const handleEdit = async (id: string) => {
    const result = await Expense.updateExpense(
      {
        ...data,
      },
      id
    );

    if ("error" in result) {
      console.error("Error adding expense:", result.error);
    } else {
      dispatch({
        type: "UPDATE_EXPENSE",
        payload: { id, data: result },
      });
      navigation.goBack();
    }
  };

  const handleSave = () => {
    if (validateFields()) {
      if (route.params.action === "add") {
        handleAdd();
      } else if (route.params.action === "edit" && route.params._id) {
        handleEdit(route.params._id);
      }
    }
  };

  useEffect(() => {
    if (route.params._id) {
      const found = state.expenses.find((el) => el._id === route.params._id);
      setData({
        amount: found?.amount ?? "",
        category: found?.category ?? "",
        date: found?.date ?? "",
        description: found?.description ?? "",
      });
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Input
          value={data.category}
          onChangeText={(value) => handleChange("category", value)}
          boxProps={{ style: styles.inputBox }}
          labelProps={{ content: "Add Category" }}
          placeholder="Eg. Transport"
          errorText={error?.category ? { content: error.category } : undefined}
        />

        <View style={styles.row}>
          <Input
            value={data.date}
            onChangeText={(value) => handleChange("date", value)}
            keyboardType="number-pad"
            boxProps={{ style: styles.halfInputBox }}
            labelProps={{ content: "Add Date" }}
            placeholder="2024-10-19"
            errorText={error?.date ? { content: error.date } : undefined}
          />
          <Input
            value={data.amount}
            onChangeText={(value) => handleChange("amount", value)}
            keyboardType="number-pad"
            boxProps={{ style: styles.halfInputBox }}
            labelProps={{ content: "Add Amount" }}
            placeholder="20"
            errorText={error?.amount ? { content: error.amount } : undefined}
          />
        </View>

        <Input
          value={data.description}
          onChangeText={(value) => handleChange("description", value)}
          multiline
          numberOfLines={5}
          boxProps={{ style: styles.inputBox }}
          labelProps={{ content: "Add Description" }}
          placeholder="Uber ride to office....."
          errorText={
            error?.description ? { content: error.description } : undefined
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 25,
          }}
        >
          <Button
            content={"Cancel"}
            variant="outline"
            style={{
              width: "30%",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Button
            content={"Save"}
            variant="primary"
            style={{
              width: "30%",
            }}
            onPress={handleSave}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    paddingTop: 50,
    backgroundColor: colorPalette.primary.background,
  },
  inputBox: {
    padding: 10,
    gap: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputBox: {
    padding: 10,
    gap: 5,
    width: "48%",
  },
});

export default AddEditExpenses;
