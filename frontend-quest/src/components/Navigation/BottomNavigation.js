// src/components/Navigation/BottomNavigation.js (Updated)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BottomNavigation = ({ navigation, activeTab }) => {
  const navItems = [
    { name: 'Home', icon: 'home', screen: 'Dashboard' },
    { name: 'Tasks', icon: 'task-alt', screen: 'Tasks' },
    { name: 'Guild', icon: 'group', screen: 'Guild' },
    { name: 'Rewards', icon: 'emoji-events', screen: 'RewardsShop' },
    { name: 'Profile', icon: 'person', screen: 'Profile' }
  ];

  return (
    <View style={styles.container}>
      {navItems.map((tab) => (
        <TouchableOpacity 
          key={tab.name} 
          style={styles.navItem}
          onPress={() => navigation.navigate(tab.screen)}
        >
          <MaterialIcons 
            name={tab.icon} 
            size={24} 
            color={activeTab === tab.name ? '#6A4CFF' : '#666'} 
          />
          <Text style={[
            styles.navText, 
            { 
              color: activeTab === tab.name ? '#6A4CFF' : '#666', 
              fontWeight: activeTab === tab.name ? 'bold' : 'normal' 
            }
          ]}>
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
  },
});

export default BottomNavigation;