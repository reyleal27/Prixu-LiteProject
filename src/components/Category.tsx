
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/theme/colors";

type CategoryChipProps = {
  name: string;
  isActive?: boolean;
  onPress?: () => void;
};

export default function CategoryChip({
  name,
  isActive = false,
  onPress,
}: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
  },
  chipTextActive: {
    color: "#fff",
  },
});
