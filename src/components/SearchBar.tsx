
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Colors } from "@/src/theme/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  handleSearch?: () => void;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search anime...",
  handleSearch
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon} onPress={handleSearch}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        onPress={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.muted,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    padding: 4,
  },
});
