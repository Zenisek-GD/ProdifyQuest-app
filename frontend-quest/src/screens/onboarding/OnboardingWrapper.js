// src/screens/onboarding/OnboardingWrapper.js
import React, { useState } from 'react';
import { View } from 'react-native';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import OnboardingScreen4 from './OnboardingScreen4';

const OnboardingWrapper = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleCompleteOnboarding = () => {
    // Navigate to Dashboard when onboarding is complete
    navigation.replace('Dashboard');
  };

  const handleSkipOnboarding = () => {
    // Navigate to Dashboard when onboarding is skipped
    navigation.replace('Dashboard');
  };

  const screens = [
    {
      component: OnboardingScreen1,
      props: {
        onContinue: () => setCurrentScreen(1),
        onSkip: handleSkipOnboarding
      }
    },
    {
      component: OnboardingScreen2,
      props: {
        onContinue: () => setCurrentScreen(2),
        onSkip: handleSkipOnboarding
      }
    },
    {
      component: OnboardingScreen3,
      props: {
        onContinue: () => setCurrentScreen(3),
        onSkip: handleSkipOnboarding
      }
    },
    {
      component: OnboardingScreen4,
      props: {
        onContinue: handleCompleteOnboarding,
        onSkip: handleSkipOnboarding
      }
    }
  ];

  const CurrentScreen = screens[currentScreen].component;
  const screenProps = screens[currentScreen].props;

  return (
    <View style={{ flex: 1 }}>
      <CurrentScreen {...screenProps} />
    </View>
  );
};

export default OnboardingWrapper;