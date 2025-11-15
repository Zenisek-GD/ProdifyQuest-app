// src/screens/Students/ProfileScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  Switch,
  Alert,
  Modal,
  TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton, SecondaryButton } from '../../components/UI/Button';
import { Card, CardHeader, CardTitle } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'Alex Rodriguez',
    title: 'Level 15 Prodigy',
    description: 'Computer Science Student',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3F0aHU6-B_TBRBmfIiZAHaSOcPekUOwipXL5AzhmKsdq7T-hU4s4VkWWIjTlkXb54p8vv_b7zlZ0H_32OTP7HaXokUfEj7VgUvSjdvc5NG2EFM9RZw1H1zd8t0N_VX-aCLLKcmNg_fbT6r4U8HZnOZlj8_LvPSst0OHGPhJqo61RLoIAO7LlVBi9_27tkhQcGC_ZXF21M9K2tflk9thzaRhhgg4azXczZbhYr6Z7dEWXiRszBBvtRMWMvQpbmWHEcJ-SlKoVTqSV',
    level: 15,
    currentXP: 420,
    nextLevelXP: 1000,
    streak: 5,
    coins: 245,
    questsCompleted: 47,
    guildRank: 3
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
    vibration: true,
    autoSave: false,
    dataSaver: false
  });

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userData.name,
    title: userData.title,
    description: userData.description
  });

  const achievements = [
    {
      id: 1,
      name: 'Early Bird',
      description: 'Complete 10 morning quests',
      icon: '🌅',
      unlocked: true,
      progress: 1.0
    },
    {
      id: 2,
      name: 'Scholar',
      description: 'Complete 50 academic quests',
      icon: '📚',
      unlocked: false,
      progress: 0.8
    },
    {
      id: 3,
      name: 'Streak Master',
      description: 'Maintain a 30-day streak',
      icon: '🔥',
      unlocked: false,
      progress: 0.2
    },
    {
      id: 4,
      name: 'Social Butterfly',
      description: 'Join 5 guild activities',
      icon: '🦋',
      unlocked: true,
      progress: 1.0
    },
    {
      id: 5,
      name: 'Quest Champion',
      description: 'Complete 100 quests',
      icon: '🏆',
      unlocked: false,
      progress: 0.47
    }
  ];

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Sorry, we need camera roll permissions to change your avatar.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUserData(prev => ({
        ...prev,
        avatar: result.assets[0].uri
      }));
    }
  };

  const handleEditProfile = () => {
    setEditForm({
      name: userData.name,
      title: userData.title,
      description: userData.description
    });
    setEditModalVisible(true);
  };

  const saveProfileChanges = () => {
    setUserData(prev => ({
      ...prev,
      ...editForm
    }));
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleShareProfile = () => {
    Alert.alert('Share Profile', 'Profile sharing feature would be implemented here!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => console.log('User logged out') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Profile"
        subtitle="Your learning journey"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <ProfileHeader 
          userData={userData} 
          onEditAvatar={pickImage}
        />

        {/* Quick Stats */}
        <QuickStats userData={userData} />

        {/* Achievements */}
        <AchievementsSection achievements={achievements} />

        {/* Settings */}
        <SettingsSection 
          settings={settings} 
          onToggle={handleSettingToggle}
          onLogout={handleLogout}
          onDeleteAccount={handleDeleteAccount}
        />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <SecondaryButton 
            title="Edit Profile" 
            icon="edit"
            onPress={handleEditProfile}
          />
          <PrimaryButton 
            title="Share Profile" 
            icon="share"
            onPress={handleShareProfile}
          />
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        form={editForm}
        onFormChange={setEditForm}
        onSave={saveProfileChanges}
        onCancel={() => setEditModalVisible(false)}
      />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
};

// Sub-components
const ProfileHeader = ({ userData, onEditAvatar }) => {
  const progressPercentage = (userData.currentXP / userData.nextLevelXP) * 100;

  return (
    <Card style={styles.profileHeader}>
      <View style={styles.profileContent}>
        <TouchableOpacity onPress={onEditAvatar} style={styles.avatarContainer}>
          <Image source={{ uri: userData.avatar }} style={styles.profileAvatar} />
          <View style={styles.editAvatarOverlay}>
            <MaterialIcons name="edit" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileTitle}>{userData.title}</Text>
          <Text style={styles.profileDescription}>{userData.description}</Text>
          
          <View style={styles.xpProgress}>
            <View style={styles.xpLabels}>
              <Text style={styles.xpText}>XP: {userData.currentXP}/{userData.nextLevelXP}</Text>
              <Text style={styles.xpPercent}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
            <View style={styles.xpBar}>
              <View 
                style={[
                  styles.xpFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
};

const QuickStats = ({ userData }) => (
  <View style={styles.statsGrid}>
    <StatCard 
      icon="local-fire-department" 
      value={userData.streak} 
      label="Day Streak" 
      color="#f97316"
    />
    <StatCard 
      icon="monetization-on" 
      value={userData.coins} 
      label="Coins" 
      color="#eab308"
    />
    <StatCard 
      icon="task-alt" 
      value={userData.questsCompleted} 
      label="Quests Done" 
      color="#6a4dff"
    />
    <StatCard 
      icon="leaderboard" 
      value={`#${userData.guildRank}`} 
      label="Guild Rank" 
      color="#22c55e"
    />
  </View>
);

const StatCard = ({ icon, value, label, color }) => (
  <Card style={styles.statCard}>
    <View style={styles.statContent}>
      <View style={[styles.statIcon, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </Card>
);

const AchievementsSection = ({ achievements }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Achievements</Text>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.achievementsScroll}
    >
      {achievements.map((achievement) => (
        <AchievementCard key={achievement.id} achievement={achievement} />
      ))}
    </ScrollView>
  </View>
);

const AchievementCard = ({ achievement }) => (
  <Card style={[styles.achievementCard, !achievement.unlocked && styles.lockedAchievement]}>
    <View style={styles.achievementContent}>
      <View style={styles.achievementIcon}>
        <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
      </View>
      <View style={styles.achievementInfo}>
        <Text style={styles.achievementName}>{achievement.name}</Text>
        <Text style={styles.achievementDescription}>{achievement.description}</Text>
        {!achievement.unlocked && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${achievement.progress * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(achievement.progress * 100)}%
            </Text>
          </View>
        )}
      </View>
      {achievement.unlocked && (
        <MaterialIcons name="verified" size={20} color="#6a4dff" />
      )}
    </View>
  </Card>
);

const SettingsSection = ({ settings, onToggle, onLogout, onDeleteAccount }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Settings</Text>
    <Card style={styles.settingsCard}>
      <SettingItem
        icon="notifications"
        title="Push Notifications"
        description="Receive quest reminders and updates"
        value={settings.notifications}
        onToggle={() => onToggle('notifications')}
      />
      <SettingItem
        icon="dark-mode"
        title="Dark Mode"
        description="Switch to dark theme"
        value={settings.darkMode}
        onToggle={() => onToggle('darkMode')}
      />
      <SettingItem
        icon="volume-up"
        title="Sound Effects"
        description="Play sounds for quest completions"
        value={settings.soundEffects}
        onToggle={() => onToggle('soundEffects')}
      />
      <SettingItem
        icon="vibration"
        title="Vibration"
        description="Haptic feedback for interactions"
        value={settings.vibration}
        onToggle={() => onToggle('vibration')}
      />
      <SettingItem
        icon="save"
        title="Auto Save Progress"
        description="Automatically save your progress"
        value={settings.autoSave}
        onToggle={() => onToggle('autoSave')}
      />
      <SettingItem
        icon="data-saver-off"
        title="Data Saver"
        description="Reduce data usage"
        value={settings.dataSaver}
        onToggle={() => onToggle('dataSaver')}
      />
      
      <View style={styles.divider} />
      
      <TouchableOpacity style={styles.dangerItem} onPress={onLogout}>
        <View style={styles.dangerIcon}>
          <MaterialIcons name="logout" size={24} color="#ef4444" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.dangerTitle}>Logout</Text>
          <Text style={styles.dangerDescription}>Sign out of your account</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.dangerItem} onPress={onDeleteAccount}>
        <View style={styles.dangerIcon}>
          <MaterialIcons name="delete" size={24} color="#ef4444" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.dangerTitle}>Delete Account</Text>
          <Text style={styles.dangerDescription}>Permanently delete your account and data</Text>
        </View>
      </TouchableOpacity>
    </Card>
  </View>
);

const SettingItem = ({ icon, title, description, value, onToggle }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingContent}>
      <View style={styles.settingIcon}>
        <MaterialIcons name={icon} size={24} color="#6a4dff" />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: '#d1d5db', true: '#6a4dff' }}
      thumbColor={value ? '#ffffff' : '#f3f4f6'}
    />
  </View>
);

const EditProfileModal = ({ visible, form, onFormChange, onSave, onCancel }) => (
  <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="pageSheet"
  >
    <SafeAreaView style={styles.modalContainer}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={onCancel}>
          <MaterialIcons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.modalContent}>
        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.textInput}
            value={form.name}
            onChangeText={(text) => onFormChange({ ...form, name: text })}
            placeholder="Enter your full name"
          />
        </Card>

        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={form.title}
            onChangeText={(text) => onFormChange({ ...form, title: text })}
            placeholder="e.g., Level 15 Prodigy"
          />
        </Card>

        <Card style={styles.inputCard}>
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={form.description}
            onChangeText={(text) => onFormChange({ ...form, description: text })}
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={3}
          />
        </Card>
      </ScrollView>

      <View style={styles.modalActions}>
        <SecondaryButton 
          title="Cancel" 
          onPress={onCancel}
          style={styles.modalButton}
        />
        <PrimaryButton 
          title="Save Changes" 
          onPress={onSave}
          style={styles.modalButton}
        />
      </View>
    </SafeAreaView>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    margin: 16,
    marginBottom: 0,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#6a4dff',
  },
  editAvatarOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6a4dff',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: '#6a4dff',
    fontWeight: '600',
    marginBottom: 2,
  },
  profileDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  xpProgress: {
    marginTop: 8,
  },
  xpLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  xpText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  xpPercent: {
    fontSize: 14,
    color: '#6a4dff',
    fontWeight: '600',
  },
  xpBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#6a4dff',
    borderRadius: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: (width - 56) / 2,
    padding: 16,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 12,
  },
  achievementsScroll: {
    gap: 12,
  },
  achievementCard: {
    width: 280,
    padding: 16,
  },
  lockedAchievement: {
    opacity: 0.7,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6a4dff',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    minWidth: 35,
  },
  settingsCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  dangerIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginBottom: 2,
  },
  dangerDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    paddingTop: 0,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0c1d',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  inputCard: {
    padding: 16,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f0c1d',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#0f0c1d',
    padding: 12,
    backgroundColor: '#f8f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  modalButton: {
    flex: 1,
  },
});

export default ProfileScreen;