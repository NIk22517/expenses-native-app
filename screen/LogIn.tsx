import { Keyboard, StyleSheet, View } from "react-native";
import Input from "../components/Input";
import { colorPalette } from "../global/ColorCode";
import Button from "../components/Button";
import { useState } from "react";
import Icon from "../components/Icon";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Auth from "../services/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackType } from "../Routes";
import { setStoreData } from "../helper/isAuth";
import { useAuth } from "../store/Auth";

type EmailPasswordType = {
  email: string;
  password: string;
};

type NavType = NativeStackScreenProps<StackType>;

const LogIn = ({ navigation }: NavType) => {
  const { setAuth } = useAuth();
  const [data, setData] = useState<EmailPasswordType>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);

  const handleChange = (key: keyof EmailPasswordType, value: string) => {
    setData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = async () => {
    const res = await Auth.login(data);
    if ("error" in res) {
      console.log(res.error);
    } else {
      setAuth({
        is_log_in: true,
        data: res.data.data,
      });
      const res_data = await setStoreData({ key: "auth", data: res.data.data });
      if (res_data) {
        navigation.navigate("tabs_expenses");
      }
    }
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <Input
            value={data.email}
            placeholder="Enter Email"
            style={{
              paddingVertical: 10,
            }}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
          />
          <View style={styles.passwordContainer}>
            <Input
              secureTextEntry={!show}
              value={data.password}
              placeholder="Enter password"
              style={{
                paddingVertical: 10,
                width: 275,
                borderWidth: 0,
              }}
              onChangeText={(value) => handleChange("password", value)}
            />
            <Button
              content={<Icon name={show ? "visibility-off" : "visibility"} />}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setShow(!show);
              }}
            />
          </View>
          <Button content="Log In" variant="primary" onPress={handleSubmit} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primary.background,
    padding: 10,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 50,
    justifyContent: "center",
    gap: 25,
    elevation: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "space-between",
  },
});

export default LogIn;
