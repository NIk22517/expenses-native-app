import Routes from "./Routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./store/Auth";

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <Routes />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
