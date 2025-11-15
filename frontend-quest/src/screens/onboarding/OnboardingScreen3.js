// src/screens/onboarding/OnboardingScreen3.js
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

const { width, height } = Dimensions.get('window');

const OnboardingScreen3 = ({ navigation, onContinue, onSkip }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4hqiKKlrCV36xlgbPvhhxPwkYl1yMHf70GzZOY9QS8uFoC1DG7wDaijLV6Vzv6OeRZA14cEumH9DNCVI5_GqPZzjL7MGfAgRD07pnO6AzInYBAxQzqwJFl9UVL0eWXqnUvd9lMGVbdNi5s75zcU755yadOxKbCaaVu8yWDqWa8v44nAjd3DqUNjZdbeCDJCQP4VqSVn2_GjtU2-QDptItGBpbYJ-RTScRoe-0gEtWHdo7Hasg4UTj_PhMINmIlpCIRW6yeA1vuDB" }}
            style={styles.rewardsImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Get Rewarded for Progress</Text>
          <Text style={styles.description}>
            Earn coins & badges for completing tasks
          </Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
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
          <Text style={styles.secondaryButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: width * 0.9,
    height: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  rewardsImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F0F0F0',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: 'rgba(240, 240, 240, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    maxWidth: 300,
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
    backgroundColor: '#00C49A',
  },
  inactiveDot: {
    backgroundColor: '#00C49A',
    opacity: 0.2,
  },
  buttonContainer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#00C49A',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00C49A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#1A1A2E',
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
    color: 'rgba(240, 240, 240, 0.6)',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
});

export default OnboardingScreen3;