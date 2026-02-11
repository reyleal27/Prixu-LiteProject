import { TextInput } from "react-native";

export function Input({ value, onChangeText, placeholder }: { value: string; onChangeText: (text: string) => void; placeholder?: string }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className="border p-2 rounded"
    />
  );
}
