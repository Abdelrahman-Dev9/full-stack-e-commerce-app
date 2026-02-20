import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/src/services/authApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store/store";
import { setToken, setUserId } from "@/src/store/authSlice";

// ✅ Validation Schema (FIXED)
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const dispatch = useDispatch<AppDispatch>();

  // ✅ Login Handler
  const handleLogin = async (data: FormData) => {
    try {
      const res = await login(data).unwrap();

      // ✅ Save userId first
      dispatch(setUserId(res.data.id));
      dispatch(setToken(res.token));

      Alert.alert("Success", "Login successful!", [
        {
          text: "Continue",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]);
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Login failed";

      Alert.alert("Error", message);
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
          paddingTop: Platform.OS === "ios" ? 120 : 80,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
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
            Sign in to access your account
          </Text>
        </View>

        {/* FORM */}
        <View className="mb-6">
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

                  {/* ✅ Forgot Password Link */}

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

          {/* BUTTON */}
          <TouchableOpacity
            className="mb-6"
            onPress={handleSubmit(handleLogin)}
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
                  Sign In
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* DIVIDER */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
            <Text className="text-xs font-medium text-[#D1D5DB] mx-4 uppercase tracking-widest">
              Or continue with
            </Text>
            <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
          </View>

          {/* SOCIAL */}
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity className="bg-white border-2 border-[#E5E7EB] rounded-full py-4 px-8">
              <Text style={{ fontSize: 20 }}>G</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-8 py-4 bg-black rounded-full">
              <MaterialIcons name="apple" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View className="items-center">
            <View className="flex-row items-center">
              <Text className="text-base text-[#6B7280]">
                Don{"'"}t have an account?
              </Text>

              <TouchableOpacity onPress={() => router.push("/(auth)/SignUp")}>
                <Text className="text-base text-[#3B82F6] font-bold">
                  {" "}
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
