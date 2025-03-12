import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { images } from "@/constants/index";

const Onboarding = () => {
    const router = useRouter(); 

    return (
        <SafeAreaView className="flex h-full items-center justify-between bg-white">
            <View className="mt-[92px]">
                <Image source={images.welcomeLogo} />
            </View>

            <View className="items-center justify-center px-11 mb-6">
                <Text className="text-black text-2xl font-SFProBold text-center">
                    Ласкаво просимо до Walkey!
                </Text>
                <Text className="text-gray-500 text-md font-SFProRegular mt-2 text-center">
                    Усе для щасливих і безпечних прогулянок з вашим песиком.
                </Text>
            </View>


            <View className="w-full px-11 mb-[70px]">
                <TouchableOpacity 
                className="bg-[#FF6C22] rounded-[30px] py-4 mb-4"
                onPress={() => router.push('/(auth)/sign-up')}
                >
                <Text className="text-white text-center text-lg font-SFProBold">Почати</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                className="bg-[#FFE5D8] rounded-[30px] py-4"
                onPress={() => router.push('/(auth)/sign-in')}
                >
                <Text className="text-black text-center text-lg font-SFProBold">Увійти</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default Onboarding;
