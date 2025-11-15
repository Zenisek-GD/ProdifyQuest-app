// src/screens/Students/StudentDashboard.js
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
  Dimensions
} from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton, SecondaryButton } from '../../components/UI/Button';
import { Card, CardHeader, CardTitle } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const StudentDashboard = ({ navigation, onShowDevMenu }) => {
  const [tapCount, setTapCount] = useState(0);

  const onHeaderTap = (event) => {
    if (event.nativeEvent.state === State.END) {
      setTapCount(prev => {
        const newCount = prev + 1;
        if (newCount === 5) { // Triple tap to trigger
          onShowDevMenu();
          return 0;
        }
        
        // Reset counter after 2 seconds
        setTimeout(() => {
          setTapCount(0);
        }, 2000);
        
        return newCount;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.designRoot}>
        {/* Top App Bar with secret gesture */}
        <TapGestureHandler onHandlerStateChange={onHeaderTap}>
          <View>
            <Header />
          </View>
        </TapGestureHandler>
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Greeting Section */}
          <GreetingSection />
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <PrimaryButton 
              title="Add Quest" 
              icon="add"
              onPress={() => navigation.navigate('CreateQuest')}
              style={{ flex: 1 }}
            />
            <SecondaryButton 
              title="My Guild" 
              icon="group"
              onPress={() => navigation.navigate('Guild')}
              style={{ flex: 1 }}
            />
          </View>
          
          {/* Progress Cards */}
          <ProgressCards />
          
          {/* Quest Lists */}
          <QuestLists />
        </ScrollView>
        
        {/* Bottom Navigation Bar */}
        <BottomNavigation navigation={navigation} activeTab="Home" />
      </View>
    </SafeAreaView>
  );
};

// Sub-components
const Header = () => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Image 
        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBa3F0aHU6-B_TBRBmfIiZAHaSOcPekUOwipXL5AzhmKsdq7T-hU4s4VkWWIjTlkXb54p8vv_b7zlZ0H_32OTP7HaXokUfEj7VgUvSjdvc5NG2EFM9RZw1H1zd8t0N_VX-aCLLKcmNg_fbT6r4U8HZnOZlj8_LvPSst0OHGPhJqo61RLoIAO7LlVBi9_27tkhQcGC_ZXF21M9K2tflk9thzaRhhgg4azXczZbhYr6Z7dEWXiRszBBvtRMWMvQpbmWHEcJ-SlKoVTqSV" }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.userName}>Alex R.</Text>
        <Text style={styles.userLevel}>Level 5 — Prodigy</Text>
      </View>
    </View>
    
    <View style={styles.headerRight}>
      <StatItem icon="local-fire-department" color="#f97316" value="5" />
      <StatItem icon="bolt" color="#eab308" value="420" />
      <StatItem icon="star" color="#c084fc" value="420" />
      <StatItem icon="monetization-on" color="#f59e0b" value="1200" />
    </View>
  </View>
);

const StatItem = ({ icon, color, value }) => (
  <View style={styles.statItem}>
    <MaterialIcons name={icon} size={20} color={color} />
    <Text style={styles.statText}>{value}</Text>
  </View>
);

const GreetingSection = () => (
  <View style={styles.greetingSection}>
    <Text style={styles.greetingTitle}>Hello, Alex!</Text>
    <Text style={styles.greetingSubtitle}>Ready to start your quest today?</Text>
    <Text style={styles.streakText}>Streak: 5 days 🔥 | XP: 420 | Rank: Bronze</Text>
  </View>
);

const ProgressCards = () => (
  <View style={styles.progressCards}>
    {/* Streak Meter Card */}
    <Card>
      <CardHeader>
        <CardTitle>Streak Meter</CardTitle>
        <Text style={styles.cardValue}>5/7 Days</Text>
      </CardHeader>
      <View style={styles.progressRow}>
        <MaterialIcons name="local-fire-department" size={32} color="#f97316" />
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: '71.4%', backgroundColor: '#f97316' }]} />
        </View>
      </View>
    </Card>
    
    {/* XP & Daily Goal Card */}
    <Card>
      <CardTitle>XP & Daily Goal</CardTitle>
      <View style={styles.progressSection}>
        <ProgressItem 
          label="XP Bar" 
          value="420 / 1000" 
          progress={42} 
          color="#6A4CFF" 
        />
        <ProgressItem 
          label="Daily Goal" 
          value="3 / 5 Quests" 
          progress={60} 
          color="#14b8a6" 
        />
      </View>
    </Card>
  </View>
);

const ProgressItem = ({ label, value, progress, color }) => (
  <View style={styles.progressItem}>
    <View style={styles.progressLabels}>
      <Text style={styles.progressLabel}>{label}</Text>
      <Text style={styles.progressValue}>{value}</Text>
    </View>
    <View style={styles.progressBarBackground}>
      <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  </View>
);

const QuestLists = () => (
  <View style={styles.questLists}>
    <QuestSection title="Academic Quests" quests={academicQuests} />
    <QuestSection title="Personal Quests" quests={personalQuests} />
  </View>
);

const QuestSection = ({ title, quests }) => (
  <View style={styles.questSection}>
    <Text style={styles.questSectionTitle}>{title}</Text>
    <View style={styles.questsContainer}>
      {quests.map((quest, index) => (
        <QuestItem key={index} {...quest} />
      ))}
    </View>
  </View>
);

const QuestItem = ({ icon, title, tags }) => (
  <Card style={styles.questItem}>
    <View style={styles.questIcon}>
      <MaterialIcons name={icon} size={24} color="#6A4CFF" />
    </View>
    <View style={styles.questContent}>
      <Text style={styles.questTitle}>{title}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: tag.backgroundColor }]}>
            <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
          </View>
        ))}
      </View>
    </View>
  </Card>
);

// Data
const academicQuests = [
  {
    icon: 'calculate',
    title: 'Solve 10 calculus problems',
    tags: [
      { label: 'Urgent', color: '#FFFFFF', backgroundColor: '#ef4444' },
      { label: 'Study', color: '#1e40af', backgroundColor: '#dbeafe' }
    ]
  },
  {
    icon: 'history-edu',
    title: 'Read Chapter 5: History',
    tags: [
      { label: 'Study', color: '#1e40af', backgroundColor: '#dbeafe' }
    ]
  }
];

const personalQuests = [
  {
    icon: 'exercise',
    title: 'Go for a 30-minute run',
    tags: [
      { label: 'Health', color: '#166534', backgroundColor: '#dcfce7' }
    ]
  },
  {
    icon: 'self-improvement',
    title: 'Meditate for 10 minutes',
    tags: [
      { label: 'Habit', color: '#3730a3', backgroundColor: '#e0e7ff' }
    ]
  }
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f8',
  },
  designRoot: {
    flex: 1,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
    backgroundColor: '#f5f5f8',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#6A4CFF',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0c0c1d',
  },
  userLevel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A4CFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0c0c1d',
  },
  greetingSection: {
    padding: 16,
    paddingTop: 16,
  },
  greetingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0c0c1d',
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 16,
    color: '#4545a1',
    marginTop: 4,
  },
  streakText: {
    fontSize: 14,
    color: '#4545a1',
    marginTop: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  progressCards: {
    gap: 16,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 24,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A4CFF',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressSection: {
    gap: 12,
    marginTop: 12,
  },
  progressItem: {
    gap: 8,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4545a1',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4545a1',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#f5f5f8',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  questLists: {
    gap: 24,
    padding: 16,
    paddingTop: 0,
    paddingBottom: 100,
  },
  questSection: {
    gap: 12,
  },
  questSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c0c1d',
  },
  questsContainer: {
    gap: 12,
  },
  questItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  },
  questIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(106, 76, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questContent: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0c0c1d',
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default StudentDashboard;