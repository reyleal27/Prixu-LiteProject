import AppButton from "@/src/components/AppButton";
import { AuthContext } from "@/src/context/AuthContext";
import { router } from "expo-router";
import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/src/theme/colors";

const ProfileScreen = () => {

  const { user, logout } = useContext(AuthContext);


  const handleLogout = () => {
    logout();
    router.push("/login");
  }

  return (
    <View style={styles.container}>
      {/* User Name */}
      <View style={styles.header}>
        <Text style={styles.name}>Hi, {user?.name}</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.settings}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Notification Preferences</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Privacy Options</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}

      <AppButton onPress={handleLogout} title="Logout"/>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: Colors.grayBackground,
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "bold",
  },
  settings: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.grayBackground,
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
