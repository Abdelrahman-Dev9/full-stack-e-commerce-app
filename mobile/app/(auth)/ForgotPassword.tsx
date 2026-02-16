import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useForgetPasswordMutation } from "@/src/services/authApi";

// ✅ Validation Schema
const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormData = z.infer<typeof schema>;

const ForgotPassword = () => {
  const router = useRouter();

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // ✅ Submit
  const handleResetPassword = async (data: FormData) => {
    try {
      await forgetPassword({ email: data.email }).unwrap();

      Alert.alert("Success", "Check your email for reset code");
      router.push({
        pathname: "/(auth)/VerifyCode",
        params: { email: data.email },
      });

      // 👉 navigate to verify screen (optional)
      // router.push({
      //   pathname: "/(auth)/VerifyCode",
      //   params: { email: data.email },
      // });
    } catch (error: any) {
      console.log(error?.data || error);

      Alert.alert("Error", error?.data?.message || "Something went wrong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: Platform.OS === "ios" ? 80 : 60,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="items-center justify-center w-12 h-12 mb-8 rounded-full bg-white/80"
        >
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        {/* Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-3xl bg-[#3B82F6] items-center justify-center">
            <MaterialIcons name="lock-reset" size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold text-[#1F2937] mb-3">
            Forgot Password?
          </Text>
          <Text className="text-base text-[#9CA3AF] text-center px-4">
            Enter your email and we’ll send you a reset code
          </Text>
        </View>

        {/* FORM */}
        <View className="mb-6">
          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View className="mb-8">
                <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase">
                  Email Address
                </Text>

                <View className="relative">
                  <View className="absolute z-10 -mt-3 left-5 top-1/2">
                    <MaterialIcons
                      name="mail-outline"
                      size={24}
                      color="#9CA3AF"
                    />
                  </View>

                  <TextInput
                    className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-5 text-base"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>

                {errors.email && (
                  <Text className="mt-2 ml-2 text-xs text-red-500">
                    {errors.email.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit(handleResetPassword)}
            disabled={!isValid || isLoading}
            className="mb-6"
          >
            <View
              className={`p-4 rounded-full items-center ${
                isValid ? "bg-[#3B82F6]" : "bg-gray-400"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-bold text-white">
                  Send Reset Code
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Back to login */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center py-2"
          >
            <View className="flex-row items-center">
              <MaterialIcons name="arrow-back" size={18} color="#3B82F6" />
              <Text className="text-base text-[#3B82F6] font-bold ml-2">
                Back to Login
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
