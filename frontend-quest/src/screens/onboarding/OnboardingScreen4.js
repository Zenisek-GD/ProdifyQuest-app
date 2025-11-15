// src/screens/onboarding/OnboardingScreen4.js
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

const OnboardingScreen4 = ({ navigation, onContinue, onSkip }) => {
  const features = [
    { icon: 'add-circle', text: 'Create tasks' },
    { icon: 'calendar-month', text: 'Set deadlines' },
    { icon: 'check-box', text: 'Stay organized' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f5f8" />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.imageBackgroundCircle} />
          <Image 
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDc7Fs8GxiyqBRAHnTlTAYGREElJyGc9w0gnaxwPbwEfJ3Rpc-ND5ppMiu4o0EDMY2av906VHSDyOy1dOb5mxvoAIQDfWj2et7_11UqdZIRDfXSqB29YH7fn5sUe4mqGrhr9TLj3iikdaig6-zj3zFDH1S24_ruFxXEytIefwUVjCmBN38v57NusT6RW-RRt1rX38WO1Tdbf17bf-2sbPEdUrDDByqhpIQyKVv5plsMrXoqY1ZZqoGS7f0jj_RCmtxJYodrkIBioGuC" }}
            style={styles.trackingImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Track Your Quests</Text>
          
          {/* Features List */}
          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <FeatureItem key={index} icon={feature.icon} text={feature.text} />
            ))}
          </View>
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

const FeatureItem = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <MaterialIcons name={icon} size={24} color="#4725f4" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f5f8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 40,
    justifyContent: 'center',
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
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40,
  },
  imageBackgroundCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: (width * 0.8) / 2,
    backgroundColor: '#4725f4',
    opacity: 0.1,
  },
  trackingImage: {
    width: '80%',
    height: '80%',
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
    marginBottom: 32,
    lineHeight: 38,
  },
  featuresContainer: {
    width: '100%',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(71, 37, 244, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#100d1c',
    flex: 1,
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
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.015,
  },
});

export default OnboardingScreen4;