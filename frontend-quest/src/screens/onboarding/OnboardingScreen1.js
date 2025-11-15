import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { MaterialIcons } from '@expo/vector-icons';

const Button = styled(TouchableOpacity);

export default function OnboardingScreen1({ navigation }) {
  return (
    <View className="flex-1 bg-background-light dark:bg-background-dark px-4 justify-center">
      <View className="items-center">
        <View className="w-full max-w-xs aspect-square relative">
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXLMHB-ug4hVH0IBuyU0Cg25CbgpF-LOmSDq752d0zWp6vepezLUUA1FZrBpwsSUK54296Tfm1IBxChMJ1UP2fwY2vb7a48bbL02U4KekeNz2cY5R9yZpRx8X2a4xo0mJ19XJYOHEpoE4v9juzPLO00D8NUjKi-TB769dhOwHY8OoC0LCdqxTVoX463LZIzGzyjT1qbc6TDnxPPfWxuGQ2cv56fjYH0Dc6bi2oyDVZszNm2SwHPmiLPXBEly4qAcak29AqPd9i6W8x',
            }}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
          />
          {/* Star Icon */}
          <View className="absolute top-[12%] left-[10%] h-[18%] w-[18%] rounded-full bg-yellow-400 items-center justify-center shadow-lg">
            <MaterialIcons name="star" size={40} color="#b77900" />
          </View>
          {/* Knight Character */}
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfhBolMiBbPTwt7tjP-psWXsQMbq0fBRF4pDGhI0TvL8gK4zdqqTI6A73c1xYG4SuLPI0o2sp5Hm1OJb3BtfSAWnePFqXsuNGLl8dzHseUFj4XlPPmV3pJkj5st1GWIwfxzB-PbTGFKjEf_gVHkbNUdvSzRiRKaLulIUH1Fcgh5zpw7iNNpJc7SHNopuC1uVgymPUFCpf8t7rBJPgW_TtfENsKvQTebtUBPd4_6OHzVQ2BBBituypHaxjvya-4EtPu7M_eywTwy9CH',
            }}
            className="absolute bottom-[8%] right-[5%] w-[25%] h-[25%]"
            resizeMode="contain"
          />
          {/* Achievement Badge */}
          <View className="absolute top-[40%] right-[15%] h-[20%] w-[20%] rounded-full bg-purple-200 items-center justify-center shadow-lg -rotate-12">
            <MaterialIcons name="task-alt" size={40} color="#6b21a8" />
          </View>
        </View>

        {/* Title */}
        <Text className="text-center text-3xl font-bold text-[#100d1c] dark:text-white mt-6">
          Welcome to ProdifyQuest
        </Text>
        <Text className="text-center text-base text-[#100d1c]/70 dark:text-white/70 mt-1">
          Turn tasks into quests and learning into adventure.
        </Text>

        {/* Pagination Indicators */}
        <View className="flex-row items-center justify-center gap-2 mt-5">
          <View className="h-2 w-2 rounded-full bg-primary"></View>
          <View className="h-2 w-2 rounded-full bg-primary/30"></View>
          <View className="h-2 w-2 rounded-full bg-primary/30"></View>
          <View className="h-2 w-2 rounded-full bg-primary/30"></View>
          <View className="h-2 w-2 rounded-full bg-primary/30"></View>
        </View>

        {/* Buttons */}
        <View className="w-full mt-5 space-y-2">
          <Button
            className="bg-primary rounded-xl h-12 items-center justify-center"
            onPress={() => navigation.navigate('Onboarding2')}
          >
            <Text className="text-white font-bold text-base">Continue</Text>
          </Button>
          <Button className="border border-primary rounded-xl h-12 items-center justify-center">
            <Text className="text-primary font-bold text-base">Skip for now</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
