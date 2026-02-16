import React, { useState, useRef, useEffect } from "react";
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
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { useVerifyCodeMutation } from "@/src/services/authApi";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Validation Schema
const schema = z.object({
  code: z.string().length(6, "Enter 6 digit code"),
});

type FormData = z.infer<typeof schema>;

export default function VerifyCodeScreen() {
  const router = useRouter();

  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Handle digit change
  const handleCodeChange = (text: string, index: number) => {
    if (text && !/^\d+$/.test(text)) return;

    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);

    const fullCode = newDigits.join("");
    setValue("code", fullCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify submit
  const onSubmit = async (data: FormData) => {
    try {
      await verifyCode({
        email: "abdoelnagar198@gmail.com",
        code: data.code,
      }).unwrap();

      Alert.alert("Success", "Code verified", [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/Login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error?.data?.message || "Invalid verification code");

      setDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;

    Alert.alert("Success", "Code resent");
    setCountdown(60);
    setDigits(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const isDisabled = digits.some((d) => d === "");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: Platform.OS === "ios" ? 120 : 100,
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
            <MaterialIcons name="verified-user" size={48} color="#FFFFFF" />
          </View>
        </View>

        {/* Header */}
        <View className="items-center mb-10">
          <Text className="text-4xl font-bold text-[#1F2937] mb-3">
            Verify Code
          </Text>
          <Text className="text-base text-[#9CA3AF] text-center">
            Enter the 6-digit code we sent to your email
          </Text>
        </View>

        {/* OTP */}
        <View className="mb-4">
          <View className="flex-row justify-between mb-4">
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                className="w-[52px] h-[64px] bg-white/50 border-2 border-[#E5E7EB] rounded-2xl text-center text-2xl font-bold"
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Error */}
          {errors.code && (
            <Text className="mb-2 text-sm text-center text-red-500">
              {errors.code.message}
            </Text>
          )}

          {/* Verify Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading || isDisabled}
          >
            <LinearGradient
              colors={["#3B82F6", "#2563EB"]}
              className="items-center py-5 rounded-full"
              style={{
                opacity: isLoading || isDisabled ? 0.5 : 1,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-lg font-bold text-white">
                  Verify Code
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Resend */}
        <View className="items-center mt-6">
          <Text className="text-sm text-[#6B7280] mb-2">
            Didn’t receive the code?
          </Text>

          <TouchableOpacity onPress={handleResendCode} disabled={countdown > 0}>
            <Text
              className={`text-base font-bold ${
                countdown > 0 ? "text-[#9CA3AF]" : "text-[#3B82F6]"
              }`}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
