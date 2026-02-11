// src/components/AppButton.tsx
import { Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "@/src/theme/colors";
import { useState } from "react";

export default function AppButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: isPressed ? Colors.hoverIn : Colors.hoverOut,
      }}
      onHoverIn={() => setIsPressed(true)}
      onHoverOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
