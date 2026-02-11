// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";
import Toast, { BaseToast } from "react-native-toast-message";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    <Toast/>
    </AuthProvider>
  );
}
