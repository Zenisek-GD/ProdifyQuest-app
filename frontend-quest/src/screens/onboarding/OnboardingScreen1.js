// src/screens/onboarding/OnboardingScreen1.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen1 = ({ navigation, onContinue, onSkip }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f5f8" />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Image Container with Overlays */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXLMHB-ug4hVH0IBuyU0Cg25CbgpF-LOmSDq752d0zWp6vepezLUUA1FZrBpwsSUK54296Tfm1IBxChMJ1UP2fwY2vb7a48bbL02U4KekeNz2cY5R9yZpRx8X2a4xo0mJ19XJYOHEpoE4v9juzPLO00D8NUjKi-TB769dhOwHY8OoC0LCdqxTVoX463LZIzGzyjT1qbc6TDnxPPfWxuGQ2cv56fjYH0Dc6bi2oyDVZszNm2SwHPmiLPXBEly4qAcak29AqPd9i6W8x" }}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
          
          {/* Gold Coin */}
          <View style={styles.goldCoin}>
            <MaterialIcons name="star" size={32} color="#b7791f" />
          </View>
          
          {/* Character */}
          <View style={styles.character}>
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfhBolMiBbPTwt7tjP-psWXsQMbq0fBRF4pDGhI0TvL8gK4zdqqTI6A73c1xYG4SuLPI0o2sp5Hm1OJb3BtfSAWnePFqXsuNGLl8dzHseUFj4XlPPmV3pJkj5st1GWIwfxzB-PbTGFKjEf_gVHkbNUdvSzRiRKaLulIUH1Fcgh5zpw7iNNpJc7SHNopuC1uVgymPUFCpf8t7rBJPgW_TtfENsKvQTebtUBPd4_6OHzVQ2BBBituypHaxjvya-4EtPu7M_eywTwy9CH" }}
              style={styles.characterImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Achievement Badge */}
          <View style={styles.achievementBadge}>
            <MaterialIcons name="task-alt" size={32} color="#6b46c1" />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to ProdifyQuest</Text>
          <Text style={styles.description}>
            Turn tasks into quests and learning into adventure.
          </Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={onContinue}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={onSkip}
        >
          <Text style={styles.secondaryButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5f8',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    position: 'relative',
    marginBottom: 40,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  goldCoin: {
    position: 'absolute',
    top: '12%',
    left: '10%',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fbbf24',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  character: {
    position: 'absolute',
    bottom: '8%',
    right: '5%',
    width: 75,
    height: 75,
  },
  characterImage: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.5 }],
  },
  achievementBadge: {
    position: 'absolute',
    top: '40%',
    right: '15%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e9d5ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    transform: [{ rotate: '-12deg' }],
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#100d1c',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: 'rgba(16, 13, 28, 0.7)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#4725f4',
  },
  inactiveDot: {
    backgroundColor: '#4725f4',
    opacity: 0.2,
  },
  buttonContainer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4725f4',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4725f4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4725f4',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
});

export default OnboardingScreen1;