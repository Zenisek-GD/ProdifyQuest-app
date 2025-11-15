// src/screens/Students/CreateGuildQuestScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

const CreateGuildQuestScreen = ({ navigation }) => {
  const [questTitle, setQuestTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('10');
  const [duration, setDuration] = useState('7');
  const [reward, setReward] = useState('500');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Create Guild Quest"
        subtitle="Collaborate with your guild members"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Guild Info Banner */}
        <Card style={styles.guildInfoBanner}>
          <View style={styles.guildInfoContent}>
            <View style={styles.guildIcon}>
              <MaterialIcons name="groups" size={24} color="#6a4dff" />
            </View>
            <View style={styles.guildInfoText}>
              <Text style={styles.guildName}>The Erudite Scholars</Text>
              <Text style={styles.guildMembers}>12 members ready to collaborate</Text>
            </View>
          </View>
        </Card>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <InputField
            icon="flag"
            label="Quest Title"
            value={questTitle}
            onChangeText={setQuestTitle}
            placeholder="Name your guild quest"
          />

          <InputField
            icon="category"
            label="Quest Type"
            value="Collaborative"
            showArrow={true}
          />

          <View style={styles.detailsRow}>
            <InputField
              icon="target"
              label="Goal (tasks)"
              value={goal}
              onChangeText={setGoal}
              placeholder="10"
              compact={true}
              keyboardType="numeric"
            />
            <InputField
              icon="schedule"
              label="Duration (days)"
              value={duration}
              onChangeText={setDuration}
              placeholder="7"
              compact={true}
              keyboardType="numeric"
            />
          </View>

          <InputField
            icon="emoji-events"
            label="Guild Reward"
            value={reward}
            onChangeText={setReward}
            placeholder="500"
            suffix="XP"
            keyboardType="numeric"
          />

          {/* FIXED: Pass setDescription as onChangeText prop */}
          <DescriptionField
            value={description}
            onChangeText={setDescription} // This was missing
            placeholder="Describe the quest objectives and collaboration requirements..."
          />

          {/* Quest Requirements */}
          <Card style={styles.requirementsCard}>
            <Text style={styles.requirementsTitle}>Quest Requirements</Text>
            <View style={styles.requirementsList}>
              <RequirementItem 
                icon="group" 
                text="Minimum 3 members must participate" 
              />
              <RequirementItem 
                icon="task-alt" 
                text="Each member completes at least 2 tasks" 
              />
              <RequirementItem 
                icon="schedule" 
                text="Quest must be completed within duration" 
              />
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <PrimaryButton 
          title="Create Guild Quest" 
          onPress={() => {
            console.log('Creating guild quest:', { questTitle, description, goal, duration, reward });
            navigation.goBack();
          }}
          style={styles.fullWidthButton}
        />
        <SecondaryButton 
          title="Save as Draft" 
          onPress={() => console.log('Save as draft')}
          style={styles.fullWidthButton}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Guild" />
    </SafeAreaView>
  );
};

// Sub-components
const InputField = ({ 
  icon, 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  showArrow = false,
  compact = false,
  suffix,
  keyboardType = 'default'
}) => (
  <Card style={[styles.inputContainer, compact && styles.compactInput]}>
    <View style={styles.inputContent}>
      <View style={styles.inputIcon}>
        <MaterialIcons name={icon} size={24} color="#6a4dff" />
      </View>
      <View style={styles.inputTextContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#A0AEC0"
            keyboardType={keyboardType}
            editable={!!onChangeText}
          />
          {suffix && <Text style={styles.suffix}>{suffix}</Text>}
        </View>
      </View>
      {showArrow && (
        <MaterialIcons name="expand-more" size={24} color="#A0AEC0" />
      )}
    </View>
  </Card>
);

// FIXED: Use the onChangeText prop instead of setDescription directly
const DescriptionField = ({ value, onChangeText, placeholder }) => (
  <Card style={styles.descriptionContainer}>
    <View style={styles.descriptionContent}>
      <View style={styles.descriptionIcon}>
        <MaterialIcons name="description" size={24} color="#6a4dff" />
      </View>
      <View style={styles.descriptionInput}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.textArea}
          multiline
          numberOfLines={4}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          value={value}
          onChangeText={onChangeText} // FIXED: Use the prop instead of setDescription
        />
      </View>
    </View>
  </Card>
);

const RequirementItem = ({ icon, text }) => (
  <View style={styles.requirementItem}>
    <MaterialIcons name={icon} size={18} color="#6a4dff" />
    <Text style={styles.requirementText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  scrollView: {
    flex: 1,
  },
  guildInfoBanner: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: 'rgba(106, 77, 255, 0.05)',
  },
  guildInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  guildIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guildInfoText: {
    flex: 1,
  },
  guildName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6a4dff',
  },
  guildMembers: {
    fontSize: 14,
    color: 'rgba(106, 77, 255, 0.8)',
    marginTop: 2,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f0c1d',
    padding: 0,
    flex: 1,
  },
  suffix: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  detailsRow: {
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
    minHeight: 100,
  },
  requirementsCard: {
    padding: 16,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 12,
  },
  requirementsList: {
    gap: 10,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  actionButtons: {
    padding: 16,
    gap: 12,
    backgroundColor: '#f8f9ff',
  },
  fullWidthButton: {
    width: '100%',
  },
});

export default CreateGuildQuestScreen;