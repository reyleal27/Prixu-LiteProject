import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { hashPassword } from "../utils/hash";
import { useRouter } from "expo-router";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  passwordHash: string;
};

type AuthContextType = {
  token: string | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<boolean>;
  logout: () => Promise<void>;
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  loading: true,
  signup: async () => {},
  login: async () => false,
  logout: async () => {},
  user: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const savedToken = await AsyncStorage.getItem("token");
      const savedUser = await AsyncStorage.getItem("user");

      if (savedUser) setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);

      setLoading(false);
    };
    init();
  }, []);

  const signup = async ({ name, email, password }: SignupData) => {
    const existing = await AsyncStorage.getItem("user");

    if (existing) {
      const savedUser: User = JSON.parse(existing);

      if (savedUser.email.trim().toLowerCase() === email.trim().toLowerCase()) {
        throw new Error("Email already registered");
      }
    }

    const passwordHash = await hashPassword(password);

    const user: User = {
      name,
      email,
      passwordHash,
    };

    await AsyncStorage.setItem("user", JSON.stringify(user));
  };
const login = async ({ email, password }: LoginData) => {
  const saved = await AsyncStorage.getItem("user");
  if (!saved) throw new Error("No user found");

  const savedUser: User = JSON.parse(saved);
  const passwordHash = await hashPassword(password);

  if (
    savedUser.email.trim().toLowerCase() === email.trim().toLowerCase() &&
    savedUser.passwordHash === passwordHash
  ) {
    const authToken = "prixu-auth-token";
    await AsyncStorage.setItem("token", authToken);
    setToken(authToken);
    setUser(savedUser);
    return true;
  }

  throw new Error("Invalid email or password");
  };
  
  
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, loading, signup, login, logout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
