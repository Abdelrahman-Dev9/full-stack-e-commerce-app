import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("FORM DATA:", data);
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
                  <TouchableOpacity>
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

          {/* Sign In Button */}
          <TouchableOpacity
            className="mb-6"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text
              className={`text-xl font-semibold text-white p-4 text-center rounded-full ${
                isValid ? "bg-[#3B82F6]" : "bg-gray-400"
              }`}
            >
              Sign In
            </Text>
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
          <View className="flex-row justify-center gap-4 mb-8">
            <TouchableOpacity className=" bg-white border-2 border-[#E5E7EB] rounded-full py-4 flex-row items-center justify-center ">
              <View>
                <Text style={{ fontSize: 20 }} className="px-8 py-1">
                  G
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center py-6 bg-black rounded-full">
              <MaterialIcons
                name="apple"
                size={20}
                color="#FFFFFF"
                // style={{ marginRight: 12 }}
                className="px-8 py-1"
              />
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="items-center">
            <View className="flex-row items-center">
              <Text className="text-base text-[#6B7280]">
                Don{"'"}t have an account?
              </Text>
              <Link href="/(auth)/SignUp" asChild>
                <TouchableOpacity>
                  <Text className="text-base text-[#3B82F6] font-bold">
                    {" "}
                    Register
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
