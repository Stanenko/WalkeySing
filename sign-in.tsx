import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { useSignIn, useUser } from "@clerk/clerk-expo"; 
import { useRouter } from "expo-router";
import { icons } from "@/constants/svg";
import { useUserStore } from "../../store/userStore";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { user } = useUser();
  const router = useRouter();
  const { setUserData } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("🔹 Проверяем user.id:", user?.id);
    if (user?.id) {
      setUserData({ clerkId: user.id });
      router.replace("/(root)/(tabs)/home");
    }
  }, [user]);

  const handleSignIn = async () => {
    if (!isLoaded) return;

    if (!email || !password) {
      Alert.alert("Помилка", "Будь ласка, введіть email та пароль.");
      return;
    }

    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        console.log("Успешный вход:", signInAttempt);


        await setActive({ session: signInAttempt.createdSessionId });

        setTimeout(() => {
          if (user?.id) {
            setUserData({ clerkId: user.id });
            router.replace("/(root)/(tabs)/home");
          }
        }, 2000);
      } else {
        Alert.alert("Помилка", "Невірні дані для входу.");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
      Alert.alert("Помилка", "Щось пішло не так. Перевірте ваші дані.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-5">
        <Text className="text-2xl font-JakartaSemiBold text-black mb-5 left-5">Вхід</Text>

        {loading && <ActivityIndicator size="large" color="#FF6C22" />}

        <InputField
          label="Email"
          placeholder="Введіть email"
          icon={icons.email}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          label="Пароль"
          placeholder="Введіть пароль"
          icon={icons.lock}
          secureTextEntry
          textContentType="password"
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleSignIn}
          className="mt-5 bg-[#FF6C22] rounded-full p-4 flex items-center justify-center"
          disabled={loading}
        >
          <Text className="text-white text-lg font-JakartaSemiBold">
            {loading ? "Завантаження..." : "Увійти"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-up")}
          className="mt-5 flex items-center justify-center"
        >
          <Text className="text-[#FF6C22] text-lg font-JakartaSemiBold">
            Зареєструватися
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
