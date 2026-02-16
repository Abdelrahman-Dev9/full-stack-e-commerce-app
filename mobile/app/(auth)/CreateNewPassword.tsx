// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function NewPasswordScreen() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   // Password strength calculation
//   const getPasswordStrength = (password: string) => {
//     if (!password) return { strength: 0, label: "", color: "" };

//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (password.length >= 12) strength++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
//     if (/\d/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;

//     if (strength <= 2) return { strength, label: "Weak", color: "#EF4444" };
//     if (strength <= 3) return { strength, label: "Medium", color: "#F59E0B" };
//     return { strength, label: "Strong", color: "#10B981" };
//   };

//   const passwordStrength = getPasswordStrength(newPassword);

//   // Validation checks
//   const validations = {
//     minLength: newPassword.length >= 8,
//     hasUpperCase: /[A-Z]/.test(newPassword),
//     hasLowerCase: /[a-z]/.test(newPassword),
//     hasNumber: /\d/.test(newPassword),
//     hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
//     passwordsMatch:
//       newPassword && confirmPassword && newPassword === confirmPassword,
//   };

//   const handleResetPassword = async () => {
//     // Validate passwords
//     if (!newPassword || !confirmPassword) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     if (newPassword.length < 8) {
//       Alert.alert("Error", "Password must be at least 8 characters long");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Alert.alert("Error", "Passwords do not match");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Your API call here
//       // await resetPassword(token, newPassword);

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       Alert.alert("Success", "Your password has been reset successfully!", [
//         {
//           text: "Sign In",
//           onPress: () => router.replace("/(auth)/Login"),
//         },
//       ]);
//     } catch (error) {
//       Alert.alert("Error", "Failed to reset password. Please try again.");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       className="flex-1"
//     >
//       <LinearGradient
//         colors={["#E8EBF5", "#F0F2F8", "#FFFFFF"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         className="flex-1"
//       >
//         <ScrollView
//           contentContainerStyle={{
//             flexGrow: 1,
//             paddingHorizontal: 24,
//             paddingTop: Platform.OS === "ios" ? 80 : 60,
//             paddingBottom: 40,
//           }}
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//         >
//           {/* Back Button */}
//           <TouchableOpacity
//             onPress={() => router.back()}
//             className="items-center justify-center w-12 h-12 mb-8 rounded-full bg-white/80"
//             style={{
//               shadowColor: "#000",
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 8,
//               elevation: 2,
//             }}
//           >
//             <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
//           </TouchableOpacity>

//           {/* Key Icon */}
//           <View className="items-center mb-8">
//             <View
//               className="w-24 h-24 rounded-3xl bg-[#3B82F6] items-center justify-center"
//               style={{
//                 shadowColor: "#3B82F6",
//                 shadowOffset: { width: 0, height: 8 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 16,
//                 elevation: 8,
//               }}
//             >
//               <MaterialIcons name="vpn-key" size={48} color="#FFFFFF" />
//             </View>
//           </View>

//           {/* Header */}
//           <View className="items-center mb-8">
//             <Text className="text-4xl font-bold text-[#1F2937] mb-3">
//               New Password
//             </Text>
//             <Text className="text-base text-[#9CA3AF] font-medium text-center px-4">
//               Create a strong password for your account
//             </Text>
//           </View>

//           {/* Form */}
//           <View className="mb-6">
//             {/* New Password Input */}
//             <View className="mb-4">
//               <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
//                 New Password
//               </Text>
//               <View className="relative">
//                 <View className="absolute z-10 -mt-3 left-5 top-1/2">
//                   <MaterialIcons
//                     name="lock-outline"
//                     size={24}
//                     color="#9CA3AF"
//                   />
//                 </View>
//                 <TextInput
//                   className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-16 text-base text-[#1F2937]"
//                   placeholder="Enter new password"
//                   placeholderTextColor="#9CA3AF"
//                   secureTextEntry={!showNewPassword}
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowNewPassword(!showNewPassword)}
//                   className="absolute p-1 -mt-3 right-5 top-1/2"
//                 >
//                   <MaterialIcons
//                     name={showNewPassword ? "visibility" : "visibility-off"}
//                     size={24}
//                     color="#9CA3AF"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Password Strength Indicator */}
//             {newPassword.length > 0 && (
//               <View className="mb-6">
//                 <View className="flex-row items-center justify-between mb-2">
//                   <Text className="text-sm font-medium text-[#6B7280]">
//                     Password Strength
//                   </Text>
//                   <Text
//                     className="text-sm font-bold"
//                     style={{ color: passwordStrength.color }}
//                   >
//                     {passwordStrength.label}
//                   </Text>
//                 </View>
//                 <View className="flex-row gap-2">
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <View
//                       key={level}
//                       className="flex-1 h-2 rounded-full"
//                       style={{
//                         backgroundColor:
//                           level <= passwordStrength.strength
//                             ? passwordStrength.color
//                             : "#E5E7EB",
//                       }}
//                     />
//                   ))}
//                 </View>
//               </View>
//             )}

//             {/* Confirm Password Input */}
//             <View className="mb-6">
//               <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
//                 Confirm Password
//               </Text>
//               <View className="relative">
//                 <View className="absolute z-10 -mt-3 left-5 top-1/2">
//                   <MaterialIcons
//                     name="lock-outline"
//                     size={24}
//                     color="#9CA3AF"
//                   />
//                 </View>
//                 <TextInput
//                   className="w-full bg-white/50 border-2 border-[#E5E7EB] rounded-full py-5 pl-16 pr-16 text-base text-[#1F2937]"
//                   placeholder="Confirm new password"
//                   placeholderTextColor="#9CA3AF"
//                   secureTextEntry={!showConfirmPassword}
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                 />
//                 <TouchableOpacity
//                   onPress={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute p-1 -mt-3 right-5 top-1/2"
//                 >
//                   <MaterialIcons
//                     name={showConfirmPassword ? "visibility" : "visibility-off"}
//                     size={24}
//                     color="#9CA3AF"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Password Requirements */}
//             <View className="mb-8 bg-white/50 rounded-2xl p-5 border border-[#E5E7EB]">
//               <Text className="text-sm font-semibold text-[#1F2937] mb-3">
//                 Password Requirements
//               </Text>
//               <View className="gap-2">
//                 <ValidationItem
//                   label="At least 8 characters"
//                   isValid={validations.minLength}
//                 />
//                 <ValidationItem
//                   label="Contains uppercase letter"
//                   isValid={validations.hasUpperCase}
//                 />
//                 <ValidationItem
//                   label="Contains lowercase letter"
//                   isValid={validations.hasLowerCase}
//                 />
//                 <ValidationItem
//                   label="Contains number"
//                   isValid={validations.hasNumber}
//                 />
//                 <ValidationItem
//                   label="Contains special character"
//                   isValid={validations.hasSpecial}
//                 />
//                 {confirmPassword && (
//                   <ValidationItem
//                     label="Passwords match"
//                     isValid={validations.passwordsMatch}
//                   />
//                 )}
//               </View>
//             </View>

//             {/* Reset Password Button */}
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={handleResetPassword}
//               disabled={isLoading}
//             >
//               <LinearGradient
//                 colors={["#3B82F6", "#2563EB"]}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 className="flex-row items-center justify-center w-full py-5 rounded-full"
//                 style={{
//                   shadowColor: "#3B82F6",
//                   shadowOffset: { width: 0, height: 8 },
//                   shadowOpacity: 0.3,
//                   shadowRadius: 16,
//                   elevation: 6,
//                   opacity: isLoading ? 0.7 : 1,
//                 }}
//               >
//                 {isLoading ? (
//                   <Text className="text-lg font-bold text-white">
//                     Resetting...
//                   </Text>
//                 ) : (
//                   <>
//                     <Text className="mr-2 text-lg font-bold text-white">
//                       Reset Password
//                     </Text>
//                     <MaterialIcons
//                       name="check-circle"
//                       size={20}
//                       color="#FFFFFF"
//                     />
//                   </>
//                 )}
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// }

// // Validation Item Component
// function ValidationItem({
//   label,
//   isValid,
// }: {
//   label: string;
//   isValid: boolean;
// }) {
//   return (
//     <View className="flex-row items-center">
//       <MaterialIcons
//         name={isValid ? "check-circle" : "radio-button-unchecked"}
//         size={18}
//         color={isValid ? "#10B981" : "#9CA3AF"}
//       />
//       <Text
//         className={`text-sm ml-2 ${
//           isValid ? "text-[#10B981]" : "text-[#6B7280]"
//         }`}
//       >
//         {label}
//       </Text>
//     </View>
//   );
// }

import { useNewPasswordMutation } from "@/src/services/authApi";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [NewPassword] = useNewPasswordMutation();
  const { resetToken } = useLocalSearchParams();
  const router = useRouter();

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: "Weak", color: "#EF4444" };
    if (strength <= 3) return { strength, label: "Medium", color: "#F59E0B" };
    return { strength, label: "Strong", color: "#10B981" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  // Validation checks
  const validations = {
    minLength: newPassword.length >= 8,
    hasUpperCase: /[A-Z]/.test(newPassword),
    hasLowerCase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
    passwordsMatch: Boolean(
      newPassword && confirmPassword && newPassword === confirmPassword
    ),
  };

  const handleResetPassword = async () => {
    // Validate passwords
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // Your API call here
      // await resetPassword(token, newPassword);

      // Simulate API call
      await NewPassword({
        token: resetToken,
        newPassword: newPassword,
      }).unwrap();

      Alert.alert("Success", "Your password has been reset successfully!", [
        {
          text: "Sign In",
          onPress: () => router.replace("/(auth)/Login"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to reset password. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <LinearGradient
        colors={["#E8EBF5", "#F0F2F8", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: Platform.OS === "ios" ? 80 : 60,
            paddingBottom: 40,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center justify-center w-12 h-12 mb-8 rounded-full bg-white/80"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>

          {/* Key Icon */}
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
              <MaterialIcons name="vpn-key" size={48} color="#FFFFFF" />
            </View>
          </View>

          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-bold text-[#1F2937] mb-3">
              New Password
            </Text>
            <Text className="text-base text-[#9CA3AF] font-medium text-center px-4">
              Create a strong password for your account
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* New Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
                New Password
              </Text>
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
                  placeholder="Enter new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showNewPassword}
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword(!showNewPassword)}
                  className="absolute p-1 -mt-3 right-5 top-1/2"
                >
                  <MaterialIcons
                    name={showNewPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Strength Indicator */}
            {newPassword.length > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-sm font-medium text-[#6B7280]">
                    Password Strength
                  </Text>
                  <Text
                    className="text-sm font-bold"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label}
                  </Text>
                </View>
                <View className="flex-row gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <View
                      key={level}
                      className="flex-1 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : "#E5E7EB",
                      }}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-[#6B7280] mb-3 uppercase tracking-wider">
                Confirm Password
              </Text>
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
                  placeholder="Confirm new password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute p-1 -mt-3 right-5 top-1/2"
                >
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility" : "visibility-off"}
                    size={24}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Requirements */}
            <View className="mb-8 bg-white/50 rounded-2xl p-5 border border-[#E5E7EB]">
              <Text className="text-sm font-semibold text-[#1F2937] mb-3">
                Password Requirements
              </Text>
              <View className="gap-2">
                <ValidationItem
                  label="At least 8 characters"
                  isValid={validations.minLength}
                />
                <ValidationItem
                  label="Contains uppercase letter"
                  isValid={validations.hasUpperCase}
                />
                <ValidationItem
                  label="Contains lowercase letter"
                  isValid={validations.hasLowerCase}
                />
                <ValidationItem
                  label="Contains number"
                  isValid={validations.hasNumber}
                />
                <ValidationItem
                  label="Contains special character"
                  isValid={validations.hasSpecial}
                />
                {confirmPassword && (
                  <ValidationItem
                    label="Passwords match"
                    isValid={validations.passwordsMatch}
                  />
                )}
              </View>
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleResetPassword}
              disabled={isLoading}
            >
              <LinearGradient
                colors={["#3B82F6", "#2563EB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center justify-center w-full py-5 rounded-full"
                style={{
                  shadowColor: "#3B82F6",
                  shadowOffset: { width: 0, height: 8 },
                  borderRadius: 25,
                  shadowOpacity: 0.3,
                  shadowRadius: 16,
                  elevation: 6,
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? (
                  <Text className="p-4 text-lg font-bold text-center text-white">
                    Resetting...
                  </Text>
                ) : (
                  <>
                    <Text className="p-4 text-lg font-bold text-center text-white">
                      Reset Password
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

// Validation Item Component
function ValidationItem({
  label,
  isValid,
}: {
  label: string;
  isValid: boolean;
}) {
  return (
    <View className="flex-row items-center">
      <MaterialIcons
        name={isValid ? "check-circle" : "radio-button-unchecked"}
        size={18}
        color={isValid ? "#10B981" : "#9CA3AF"}
      />
      <Text
        className={`text-sm ml-2 ${
          isValid ? "text-[#10B981]" : "text-[#6B7280]"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}
