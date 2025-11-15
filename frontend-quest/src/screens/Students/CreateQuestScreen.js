// src/screens/Students/CreateQuestScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton, SecondaryButton } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const CreateQuestScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Create New Quest"
        subtitle="Every quest completed brings you closer to greatness!"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* XP Banner */}
        <Card style={styles.xpBanner}>
          <View style={styles.xpContent}>
            <View style={styles.xpTextContainer}>
              <Text style={styles.xpTitle}>+30 XP if completed today 🔥</Text>
              <Text style={styles.xpSubtitle}>Earn extra experience points</Text>
            </View>
            <Image 
              source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDyk0piqGQGIj8Y7N9f63-YxxBfi3Z_TRzucKlLhWDaXieIFqSzHUhJNXMbVgotKx1PalTqOjNVFTLMpoKoCu50joo-2fdtO9-Qxav7BKLlU_9v77h1UaY-L7KBwPcfOnpQDrKqsa1XaPOPR_FbhR_FLnD4OaXFpiSIiUjzS11jW0AP2HfHtmdJ80VMeu-kq0HIjxo2EaT_-m6e6Kqvtrq0aGc91jTXpmjmUFE6epoB_oFc5vAgtyUYWkuoXOjNJ1KVfZhQrMiwUeV" }}
              style={styles.trophyImage}
            />
          </View>
        </Card>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <InputField
            icon="target"
            label="Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
            placeholder="Name your quest"
            showArrow={false}
          />

          <InputField
            icon="folder"
            label="Category"
            value="Personal"
            showArrow={true}
          />

          <InputField
            icon="calendar-today"
            label="Due Date"
            value="Today, 11:00 PM"
            showArrow={false}
          />

          <InputField
            icon="star"
            label="Priority"
            value="Medium"
            showArrow={true}
          />

          <View style={styles.rewardRow}>
            <InputField
              icon="toll"
              label="Reward Type"
              value="Gold"
              showArrow={false}
              compact={true}
            />
            <InputField
              icon="savings"
              label="Amount"
              value="100"
              showArrow={false}
              compact={true}
            />
          </View>

          <DescriptionField
            value={description}
            onChangeText={setDescription}
            placeholder="Add more details..."
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <PrimaryButton 
          title="Start Quest" 
          onPress={() => console.log('Start Quest')}
          style={styles.fullWidthButton}
        />
        <SecondaryButton 
          title="Save for Later" 
          onPress={() => console.log('Save for Later')}
          style={styles.fullWidthButton}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Tasks" />
    </SafeAreaView>
  );
};

// Input Field Component
const InputField = ({ icon, label, value, onChangeText, placeholder, showArrow, compact = false }) => (
  <Card style={[styles.inputContainer, compact && styles.compactInput]}>
    <View style={styles.inputContent}>
      <View style={styles.inputIcon}>
        <MaterialIcons name={icon} size={24} color="#6a4dff" />
      </View>
      <View style={styles.inputTextContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        {onChangeText ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#A0AEC0"
          />
        ) : (
          <Text style={styles.inputValue}>{value}</Text>
        )}
      </View>
      {showArrow && (
        <MaterialIcons name="expand-more" size={24} color="#A0AEC0" />
      )}
    </View>
  </Card>
);

// Description Field Component
const DescriptionField = ({ value, onChangeText, placeholder }) => (
  <Card style={styles.descriptionContainer}>
    <View style={styles.descriptionContent}>
      <View style={styles.descriptionIcon}>
        <MaterialIcons name="edit-note" size={24} color="#6a4dff" />
      </View>
      <View style={styles.descriptionInput}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={3}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  scrollView: {
    flex: 1,
  },
  xpBanner: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
  },
  xpContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpTextContainer: {
    flex: 2,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a4dff',
  },
  xpSubtitle: {
    fontSize: 14,
    color: 'rgba(106, 77, 255, 0.8)',
    marginTop: 4,
  },
  trophyImage: {
    width: 80,
    height: 80,
  },
  inputSection: {
    padding: 16,
    gap: 12,
  },
  inputContainer: {
    padding: 16,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactInput: {
    flex: 1,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  inputTextContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f0c1d',
    padding: 0,
  },
  inputValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f0c1d',
  },
  rewardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionContent: {
    flexDirection: 'row',
  },
  descriptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 4,
  },
  descriptionInput: {
    flex: 1,
  },
  textArea: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f0c1d',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
    backgroundColor: '#f8f9ff',
  },
  fullWidthButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
  },
});

export default CreateQuestScreen;