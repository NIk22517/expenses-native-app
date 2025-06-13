import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from "react";
import { getStoreData, removeStoreData } from "../helper/isAuth";

type AuthDataType = {
  is_log_in: boolean;
  data: { [key: string]: string } | undefined | null;
};

type AuthContextType = {
  auth: AuthDataType;
  setAuth: React.Dispatch<React.SetStateAction<AuthDataType>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthDataType>({
    is_log_in: false,
    data: null,
  });

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const data = await getStoreData({ key: "auth" });
        if (data !== undefined) {
          setAuth({
            is_log_in: true,
            data: data as AuthDataType["data"],
          });
        }
      } catch (error) {
        console.error("Failed to fetch auth data:", error);
        setAuth({
          is_log_in: false,
          data: undefined,
        });
      }
    };

    fetchAuthData();
  }, []);

  console.log(auth, "auth");

  const value = useMemo(() => ({ auth, setAuth }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
