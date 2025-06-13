import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RecentExpense from "./screen/RecentExpense";
import AllExpenses from "./screen/AllExpenses";
import { colorPalette } from "./global/ColorCode";
import Icon from "./components/Icon";
import { Typography } from "./components";
import Button from "./components/Button";
import AddEditExpenses from "./screen/AddEditExpenses";
import ExpenseProvider from "./store/Expense";
import LogIn from "./screen/LogIn";
import { AuthProvider, useAuth } from "./store/Auth";

export type TabType = {
  all_expenses: undefined;
  recent_expenses: undefined;
};

export type StackType = {
  log_in: undefined;
  tabs_expenses: undefined;
  add_expenses: { action: "add" | "edit"; _id?: string };
};

const Stack = createNativeStackNavigator<StackType>();
const Tab = createBottomTabNavigator<TabType>();

type Props = BottomTabNavigationProp<StackType, "add_expenses">;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }: { navigation: Props }) => ({
        headerStyle: { backgroundColor: colorPalette.primary.main },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: colorPalette.primary.main },
        tabBarActiveTintColor: colorPalette.primary.text,
        headerRight: () => {
          return (
            <Button
              content={
                <Typography
                  content={"Add Expenses"}
                  style={{
                    color: colorPalette.secondary.border,
                    fontWeight: "bold",
                  }}
                />
              }
              style={{
                marginRight: 25,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                navigation.navigate("add_expenses", {
                  action: "add",
                });
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="recent_expenses"
        component={RecentExpense}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="hourglass-bottom" size={size} color={color} />
          ),
          title: "Recent Expenses",
          tabBarLabel: "Recent",
        }}
      />
      <Tab.Screen
        name="all_expenses"
        component={AllExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-view-day" size={size} color={color} />
          ),
          title: "All Expenses",
          tabBarLabel: "All Expenses",
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "red" },
      }}
    >
      <Stack.Screen
        name="tabs_expenses"
        component={TabNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add_expenses"
        component={AddEditExpenses}
        options={({ route }) => ({
          title: (route.params.action === "add" ? "Add" : "Edit") + " Expenses",
          headerStyle: {
            backgroundColor: colorPalette.primary.background,
          },
        })}
      />
    </Stack.Navigator>
  );
};

const UnAuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="log_in" component={LogIn} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {auth.is_log_in ? (
        <ExpenseProvider>
          <StackNavigation />
        </ExpenseProvider>
      ) : (
        <UnAuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
