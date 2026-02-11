// app/(app)/_layout.tsx
import { Tabs, Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {
  const { token, loading } = useContext(AuthContext);

  // 1️⃣ WAIT for AsyncStorage
  if (loading) {
    return null;
  }

  // 2️⃣ NOT authenticated → EXIT layout
  if (!token) {
    return <Redirect href="/" />;
  }

  // 3️⃣ Authenticated → render tabs
  return (
    // <Tabs
    //   screenOptions={{
    //     headerShown: false,
    //     tabBarActiveTintColor: "#6c63ff",
    //     tabBarActiveBackgroundColor: "red",
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Home",
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="home" size={size} color={color} />
    //       ),
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       tabBarIcon: ({ color, size }) => (
    //         <Ionicons name="person" size={size} color={color} />
    //       ),
    //     }}
    //   />
    // </Tabs>

    //   );
    // }

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1c1c2e",
          borderTopColor: "#6c63ff",
          borderTopWidth: 2,
          height: 70,
        },
        tabBarActiveTintColor: "#ff4d6d",
        tabBarInactiveTintColor: "#aaa",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />{" "}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />{" "}
      <Tabs.Screen
        name="anime"
        options={{
          title: "Anime",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
