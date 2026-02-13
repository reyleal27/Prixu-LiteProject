// app/(app)/_layout.tsx
import { Tabs} from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AppLayout() {

  return (

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
      />
       <Tabs.Screen name="(anime)" options={{ href: null }} />
  
    </Tabs>
  );
}
