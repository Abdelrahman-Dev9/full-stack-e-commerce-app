import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from "@/src/services/authApi";
import { useRouter } from "expo-router";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const handleSignup = async (data: FormData) => {
    try {
      await signup(data).unwrap();

      Alert.alert("Success", "Account created successfully!", [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/Login"),
        },
      ]);
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Failed to create account";

      Alert.alert("Error", message, [{ text: "OK", style: "cancel" }]);
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
          paddingTop: Platform.OS === "ios" ? 90 : 80,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Diamond Icon */}
        <View className="items-center mb-8">
          <View
            className="w-24 h-24 rounded-3xl bg-[#3B82F6] items-center justify-center"
            style={{
              shadowColor: "#3B82F6",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <MaterialIcons name="diamond" size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-[#1F2937] mb-3">
            Welcome Back
          </Text>
          <Text className="text-base text-[#9CA3AF] font-medium">
            Sign in to access your premium account
          </Text>
        </View>

        {/* Form */}
        <View className="mb-6">
          {/* NAME */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <View className="mb-6">
                <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
                  Full Name
                </Text>

                <View className="relative">
                  <View className="absolute z-10 -mt-3 left-5 top-1/2">
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="#9CA3AF"
                    />
                  </View>

                  <TextInput
                    className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-5 text-base text-[#1F2937]"
                    placeholder="Enter name"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                  />
                </View>

                {errors.name && (
                  <Text className="mt-2 ml-2 text-xs text-red-500">
                    {errors.name.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View className="mb-6">
                <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
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
                    className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-5 text-base text-[#1F2937]"
                    placeholder="Enter email"
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

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View className="mb-6">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
                    Password
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/ForgotPassword")}
                  >
                    <Text className="text-sm font-semibold text-[#3B82F6]">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="relative">
                  <View className="absolute z-10 -mt-3 left-5 top-1/2">
                    <MaterialIcons
                      name="lock-outline"
                      size={24}
                      color="#9CA3AF"
                    />
                  </View>

                  <TextInput
                    className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-16 text-base text-[#1F2937]"
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={value}
                    onChangeText={onChange}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute p-1 -mt-3 right-5 top-1/2"
                  >
                    <MaterialIcons
                      name={showPassword ? "visibility" : "visibility-off"}
                      size={24}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && (
                  <Text className="mt-2 ml-2 text-xs text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Register Button */}
          {/* <TouchableOpacity
            className="mb-6"
            onPress={handleSubmit(handleSignup)}
            disabled={!isValid}
          >
            <Text
              className={`text-xl font-semibold text-white p-4 text-center rounded-full ${
                isValid ? "bg-[#3B82F6]" : "bg-gray-400"
              }`}
            >
              Register
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            className="mb-6"
            onPress={handleSubmit(handleSignup)}
            disabled={!isValid || isLoading}
          >
            <View
              className={`p-4 rounded-full items-center ${
                isValid ? "bg-[#3B82F6]" : "bg-gray-400"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-xl font-semibold text-white">
                  Register
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
            <Text className="text-xs font-medium text-[#D1D5DB] mx-4 uppercase tracking-widest">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity className="flex-1 bg-white border-2 border-[#E5E7EB] rounded-full py-4 flex-row items-center justify-center">
              <View className="mr-3">
                <Text style={{ fontSize: 20 }}>G</Text>
              </View>
              <Text className="text-base font-semibold text-[#1F2937]">
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center flex-1 py-4 bg-black rounded-full">
              <MaterialIcons
                name="apple"
                size={20}
                color="#FFFFFF"
                style={{ marginRight: 12 }}
              />
              <Text className="text-base font-semibold text-white">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center">
            <View className="flex-row items-center">
              <Text className="text-base text-[#6B7280]">
                Don{"'"}t have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/Login")}>
                <Text className="text-base text-[#3B82F6] font-bold">
                  {" "}
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
