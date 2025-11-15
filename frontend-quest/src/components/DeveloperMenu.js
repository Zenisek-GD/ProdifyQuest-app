// src/components/DeveloperMenu.js
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Modal 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DeveloperMenu = ({ 
  isVisible, 
  onClose, 
  onShowOnboardingNow, 
  onResetOnboarding 
}) => {
  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will reset all app data including onboarding. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Import AsyncStorage here to avoid issues
              const AsyncStorage = await import('@react-native-async-storage/async-storage');
              await AsyncStorage.default.clear();
              Alert.alert('Success', 'All app data has been cleared.');
              onClose();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear data.');
            }
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.menu}>
          <View style={styles.header}>
            <Text style={styles.title}>Developer Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>Onboarding Options</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={onShowOnboardingNow}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="slideshow" size={22} color="#6a4dff" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Show Onboarding Now</Text>
              <Text style={styles.menuDescription}>Immediately navigate to onboarding screens</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={onResetOnboarding}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="replay" size={22} color="#6a4dff" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuText}>Reset Onboarding</Text>
              <Text style={styles.menuDescription}>Show onboarding on next app launch</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />
          
          <Text style={styles.subtitle}>Danger Zone</Text>
          
          <TouchableOpacity style={[styles.menuItem, styles.dangerItem]} onPress={clearAllData}>
            <View style={[styles.menuIcon, styles.dangerIcon]}>
              <MaterialIcons name="warning" size={22} color="#ef4444" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={[styles.menuText, styles.dangerText]}>Clear All App Data</Text>
              <Text style={styles.menuDescription}>Reset everything including user preferences</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Development Tools</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0c1d',
  },
  closeIcon: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dangerItem: {
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dangerIcon: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
    marginBottom: 4,
  },
  dangerText: {
    color: '#ef4444',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 8,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default DeveloperMenu;