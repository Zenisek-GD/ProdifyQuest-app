// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import your screens
import OnboardingWrapper from './src/screens/onboarding/OnboardingWrapper';
import StudentDashboard from './src/screens/Students/StudentDashboard';
import CreateQuestScreen from './src/screens/Students/CreateQuestScreen';
import GuildScreen from './src/screens/Students/GuildScreen';
import RewardsShopScreen from './src/screens/Students/RewardsShopScreen';
import TasksScreen from './src/screens/Students/TasksScreen';
import ProfileScreen from './src/screens/Students/ProfileScreen';
import CreateGuildQuestScreen from './src/screens/Students/CreateGuildQuestScreen';
import GuildChatScreen from './src/screens/Students/GuildChatScreen';
import ViewGuildQuestScreen from './src/screens/Students/ViewGuildQuestScreen';
import DeveloperMenu from './src/components/DeveloperMenu';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [showDevMenu, setShowDevMenu] = useState(false);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value === null) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      setIsFirstLaunch(true);
    }
  };

  const toggleDevMenu = () => {
    setShowDevMenu(!showDevMenu);
  };

  const handleShowOnboardingNow = async () => {
    try {
      await AsyncStorage.removeItem('alreadyLaunched');
      setShouldShowOnboarding(true);
      setShowDevMenu(false);
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  const handleResetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem('alreadyLaunched');
      setShowDevMenu(false);
      alert('Onboarding has been reset. It will show on next app launch.');
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  // Determine initial route
  const getInitialRoute = () => {
    if (shouldShowOnboarding) return 'Onboarding';
    return isFirstLaunch ? 'Onboarding' : 'Dashboard';
  };

  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName={getInitialRoute()}
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' }
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingWrapper} />
          <Stack.Screen name="Dashboard">
            {(props) => <StudentDashboard {...props} onShowDevMenu={toggleDevMenu} />}
          </Stack.Screen>
          <Stack.Screen name="CreateQuest" component={CreateQuestScreen} />
          <Stack.Screen name="Guild" component={GuildScreen} />
          <Stack.Screen name="RewardsShop" component={RewardsShopScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="CreateGuildQuest" component={CreateGuildQuestScreen} />
          <Stack.Screen name="GuildChat" component={GuildChatScreen} />
          <Stack.Screen name="ViewGuildQuest" component={ViewGuildQuestScreen} />
        </Stack.Navigator>

        {/* Developer Menu */}
        <DeveloperMenu 
          isVisible={showDevMenu}
          onClose={() => setShowDevMenu(false)}
          onShowOnboardingNow={handleShowOnboardingNow}
          onResetOnboarding={handleResetOnboarding}
        />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
