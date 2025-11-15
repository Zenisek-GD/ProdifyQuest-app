import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';

const Button = styled(TouchableOpacity);

export default function OnboardingScreen2({ navigation }) {
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark px-4 justify-between">
      
      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center gap-3 py-5">
        <View className="h-2 w-2 rounded-full bg-primary/30 dark:bg-primary/40" />
        <View className="h-2 w-2 rounded-full bg-primary/30 dark:bg-primary/40" />
        <View className="h-2 w-2 rounded-full bg-primary/30 dark:bg-primary/40" />
        <View className="h-2 w-2 rounded-full bg-primary" />
        <View className="h-2 w-2 rounded-full bg-primary/30 dark:bg-primary/40" />
      </View>

      {/* Icon Circle */}
      <View className="flex-grow justify-center items-center py-3">
        <View className="relative w-full max-w-xs aspect-square flex items-center justify-center">
          {/* Background Circle */}
          <View className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full" />
          
          {/* Foreground Circle with Icon */}
          <View className="relative z-10 h-40 w-40 bg-primary rounded-full shadow-2xl shadow-primary/40 items-center justify-center">
            <MaterialIcons name="groups" size={70} color="white" />
          </View>
        </View>
      </View>

      {/* Text Section */}
      <View className="flex flex-col items-center pt-4 pb-2">
        <Text className="text-center text-3xl font-bold text-[#100d1c] dark:text-[#f6f5f8] pb-3 pt-6">
          Join a Guild
        </Text>
        <Text className="text-center text-base text-[#100d1c]/80 dark:text-[#f6f5f8]/80 max-w-md">
          Study together and help your team level up!
        </Text>
      </View>

      {/* Footer Buttons */}
      <View className="flex flex-col gap-2 py-8">
        <Button
          className="bg-primary rounded-xl h-12 items-center justify-center"
          onPress={() => navigation.navigate('Onboarding3')}
        >
          <Text className="text-white font-bold text-base">Find a Guild</Text>
        </Button>

        <Button className="border border-primary rounded-xl h-12 items-center justify-center">
          <Text className="text-primary font-bold text-base">I'll do this later</Text>
        </Button>
      </View>

    </View>
  );
}
