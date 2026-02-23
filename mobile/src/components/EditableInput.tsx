import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  rules?: any;
  keyboardType?: any;
}

export default function EditableInput({
  control,
  name,
  label,
  placeholder,
  rules,
  keyboardType,
}: Props) {
  const [editable, setEditable] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="mb-4">
          <Text className="mb-1 text-xs font-semibold text-gray-400">
            {label}
          </Text>

          <View className="flex-row items-center px-3 bg-gray-100 rounded-xl">
            <TextInput
              value={value}
              onChangeText={onChange}
              editable={editable}
              placeholder={placeholder}
              keyboardType={keyboardType}
              className="flex-1 p-4 text-sm text-gray-800"
            />

            <Pressable onPress={() => setEditable(!editable)}>
              <MaterialIcons
                name={editable ? "check" : "edit"}
                size={20}
                color="#0d59f2"
              />
            </Pressable>
          </View>

          {error && (
            <Text className="mt-1 text-xs text-red-500">{error.message}</Text>
          )}
        </View>
      )}
    />
  );
}
