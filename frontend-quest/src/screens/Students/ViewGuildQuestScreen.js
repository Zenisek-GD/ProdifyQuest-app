// src/screens/Students/ViewGuildQuestScreen.js
import React from 'react';
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
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton, SecondaryButton } from '../../components/UI/Button';
import { Card, CardHeader, CardTitle } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const ViewGuildQuestScreen = ({ navigation }) => {
  const questData = {
    id: 1,
    title: 'Master the Algorithm Challenge',
    description: 'A collaborative quest to solve complex algorithm problems and improve problem-solving skills as a team.',
    creator: 'Alex',
    createdAt: '3 days ago',
    deadline: 'Oct 20, 2024',
    progress: 5,
    totalTasks: 10,
    guildReward: 500,
    participants: [
      {
        id: 1,
        name: 'Alex',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzk_yIdajqOeQH-83GjNTaBE0_YFYHaQNtwhGAJW2wcXkiY7MEl9xDc8NuYxCT7kNGD7TteoTS1J_AYyqy0CnSc-mIpXm07BANXobtG49jORHdrD17X-lxjozqHI9mjetgQZo4mVzR9jDYH28TIUNNR3iqxWzTo-D7y5IYfVVXxeQaMbwk1GPwJdCCo-1hva8q-16GUGApyCftdCMGx_aHwG9-FxveUk0MhVjQ2om73ReF6bT703SU6s7XW99a6RKtAOKgYaDBc-7y',
        tasksCompleted: 3,
        isCurrentUser: false
      },
      {
        id: 2,
        name: 'Maria',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6QZqI1LafLhqbYE-UkixyPtiX3C3LYfDsdCSGTMie_5XFhYK_UQAFdGnR6MfvtwTZL1-pwLC0gGNGkpiaw1oElnX_QwnUcXpACpFMqBcwZe3juUPgxnivV9XnJVJZcWaz9QCXRlpWS7Y_7I75E6sRjO29WnSaFz_OJe3NRNNiZkVytT6UzorRa9hMGjzTLCAyfacWJCpCD_3Rpt0m3vO85Hml868j8l8FdMVq-Bu7jzWxP932xFLVWJh6AkZKqGydl4x_SQnvmtPf',
        tasksCompleted: 2,
        isCurrentUser: false
      },
      {
        id: 3,
        name: 'You',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3F0aHU6-B_TBRBmfIiZAHaSOcPekUOwipXL5AzhmKsdq7T-hU4s4VkWWIjTlkXb54p8vv_b7zlZ0H_32OTP7HaXokUfEj7VgUvSjdvc5NG2EFM9RZw1H1zd8t0N_VX-aCLLKcmNg_fbT6r4U8HZnOZlj8_LvPSst0OHGPhJqo61RLoIAO7LlVBi9_27tkhQcGC_ZXF21M9K2tflk9thzaRhhgg4azXczZbhYr6Z7dEWXiRszBBvtRMWMvQpbmWHEcJ-SlKoVTqSV',
        tasksCompleted: 2,
        isCurrentUser: true
      },
      {
        id: 4,
        name: 'Sam',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrIjFMqghAnfH6zdIfrec53Ra6l8cB_aDRbkgHi9BQ8Ux0cCG2a7vAy0RJP78XBX3tBqvl76T3E_x3r3PQNznNlIsve0zWlKtNUg8BFHHvPIBn9HO6fW3yozcr2MqSAkPrdib7ojvfHSJ83D5dk2yUnQUds4MC4kZPHG7FCl0iiheiqTvcftGVtqqzDKTChJgT5x5UMlqBk4rJ487OU7D8Pj7XlFGvMHuS7T9tnWcWmb7CutjEgWj8yK2NM_6nFd-3eUlxPSHumJx4',
        tasksCompleted: 0,
        isCurrentUser: false
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Solve Dynamic Programming Problems',
        description: 'Complete 5 dynamic programming challenges',
        completed: true,
        completedBy: ['Alex', 'Maria']
      },
      {
        id: 2,
        title: 'Graph Algorithm Practice',
        description: 'Solve BFS, DFS, and Dijkstra problems',
        completed: true,
        completedBy: ['You', 'Alex']
      },
      {
        id: 3,
        title: 'Sorting Algorithm Analysis',
        description: 'Analyze time complexity of different sorting algorithms',
        completed: true,
        completedBy: ['Maria']
      },
      {
        id: 4,
        title: 'Greedy Algorithms',
        description: 'Solve 3 greedy algorithm problems',
        completed: true,
        completedBy: ['You']
      },
      {
        id: 5,
        title: 'Backtracking Problems',
        description: 'Complete 2 backtracking challenges',
        completed: true,
        completedBy: ['Alex']
      },
      {
        id: 6,
        title: 'Divide and Conquer',
        description: 'Solve problems using divide and conquer approach',
        completed: false,
        completedBy: []
      },
      {
        id: 7,
        title: 'Bit Manipulation',
        description: 'Practice bit manipulation techniques',
        completed: false,
        completedBy: []
      },
      {
        id: 8,
        title: 'String Algorithms',
        description: 'Work on string matching and manipulation',
        completed: false,
        completedBy: []
      },
      {
        id: 9,
        title: 'Mathematical Algorithms',
        description: 'Solve math-based algorithm problems',
        completed: false,
        completedBy: []
      },
      {
        id: 10,
        title: 'Final Challenge',
        description: 'Complex problem combining multiple concepts',
        completed: false,
        completedBy: []
      }
    ],
    requirements: [
      'Minimum 3 members must participate',
      'Each member completes at least 2 tasks',
      'Quest must be completed by deadline'
    ]
  };

  const progressPercentage = (questData.progress / questData.totalTasks) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Guild Quest"
        subtitle="Team collaboration in progress"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Quest Header */}
        <QuestHeader questData={questData} progressPercentage={progressPercentage} />

        {/* Participants Section */}
        <ParticipantsSection participants={questData.participants} />

        {/* Tasks Progress */}
        <TasksProgress tasks={questData.tasks} />

        {/* Quest Requirements */}
        <QuestRequirements requirements={questData.requirements} />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PrimaryButton 
            title="Join Quest" 
            onPress={() => console.log('Join quest')}
          />
          <SecondaryButton 
            title="Discuss in Chat" 
            onPress={() => navigation.navigate('GuildChat')}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Guild" />
    </SafeAreaView>
  );
};

// Sub-components
const QuestHeader = ({ questData, progressPercentage }) => (
  <Card style={styles.questHeader}>
    <View style={styles.questTitleSection}>
      <Text style={styles.questTitle}>{questData.title}</Text>
      <View style={styles.questMeta}>
        <View style={styles.metaItem}>
          <MaterialIcons name="person" size={16} color="#666" />
          <Text style={styles.metaText}>By {questData.creator}</Text>
        </View>
        <View style={styles.metaItem}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.metaText}>{questData.createdAt}</Text>
        </View>
      </View>
    </View>

    <Text style={styles.questDescription}>{questData.description}</Text>

    {/* Progress Section */}
    <View style={styles.progressSection}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>Guild Progress</Text>
        <Text style={styles.progressText}>
          {questData.progress}/{questData.totalTasks} tasks ({Math.round(progressPercentage)}%)
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>
    </View>

    {/* Rewards and Deadline */}
    <View style={styles.statsRow}>
      <View style={styles.statItem}>
        <MaterialIcons name="emoji-events" size={20} color="#eab308" />
        <Text style={styles.statValue}>{questData.guildReward} XP</Text>
        <Text style={styles.statLabel}>Guild Reward</Text>
      </View>
      <View style={styles.statItem}>
        <MaterialIcons name="calendar-today" size={20} color="#ef4444" />
        <Text style={styles.statValue}>{questData.deadline}</Text>
        <Text style={styles.statLabel}>Deadline</Text>
      </View>
    </View>
  </Card>
);

const ParticipantsSection = ({ participants }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Participants ({participants.length})</Text>
    <Card style={styles.participantsCard}>
      <View style={styles.participantsList}>
        {participants.map((participant) => (
          <ParticipantItem key={participant.id} participant={participant} />
        ))}
      </View>
    </Card>
  </View>
);

const ParticipantItem = ({ participant }) => (
  <View style={styles.participantItem}>
    <View style={styles.participantInfo}>
      <Image source={{ uri: participant.avatar }} style={styles.participantAvatar} />
      <View style={styles.participantDetails}>
        <Text style={[
          styles.participantName,
          participant.isCurrentUser && styles.currentUser
        ]}>
          {participant.name}
        </Text>
        <Text style={styles.participantTasks}>
          {participant.tasksCompleted} tasks completed
        </Text>
      </View>
    </View>
    {participant.tasksCompleted > 0 && (
      <View style={styles.completionBadge}>
        <MaterialIcons name="check-circle" size={16} color="#22c55e" />
      </View>
    )}
  </View>
);

const TasksProgress = ({ tasks }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Tasks Progress</Text>
    <Card style={styles.tasksCard}>
      <View style={styles.tasksList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </View>
    </Card>
  </View>
);

const TaskItem = ({ task }) => (
  <View style={[styles.taskItem, task.completed && styles.completedTask]}>
    <View style={styles.taskMain}>
      <View style={styles.taskHeader}>
        <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        {task.completed ? (
          <MaterialIcons name="check-circle" size={20} color="#22c55e" />
        ) : (
          <MaterialIcons name="radio-button-unchecked" size={20} color="#d1d5db" />
        )}
      </View>
      <Text style={[styles.taskDescription, task.completed && styles.completedText]}>
        {task.description}
      </Text>
      {task.completed && task.completedBy.length > 0 && (
        <View style={styles.completedBy}>
          <Text style={styles.completedByText}>
            Completed by: {task.completedBy.join(', ')}
          </Text>
        </View>
      )}
    </View>
  </View>
);

const QuestRequirements = ({ requirements }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Quest Requirements</Text>
    <Card style={styles.requirementsCard}>
      <View style={styles.requirementsList}>
        {requirements.map((requirement, index) => (
          <RequirementItem key={index} requirement={requirement} />
        ))}
      </View>
    </Card>
  </View>
);

const RequirementItem = ({ requirement }) => (
  <View style={styles.requirementItem}>
    <MaterialIcons name="check" size={18} color="#22c55e" />
    <Text style={styles.requirementText}>{requirement}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  questHeader: {
    marginBottom: 16,
  },
  questTitleSection: {
    marginBottom: 12,
  },
  questTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 8,
  },
  questMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  questDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
  },
  progressText: {
    fontSize: 14,
    color: '#6a4dff',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6a4dff',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(106, 77, 255, 0.05)',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 12,
  },
  participantsCard: {
    padding: 0,
  },
  participantsList: {
    gap: 1,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  participantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  participantAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  participantDetails: {
    flex: 1,
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
  },
  currentUser: {
    color: '#6a4dff',
  },
  participantTasks: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  completionBadge: {
    padding: 4,
  },
  tasksCard: {
    padding: 0,
  },
  tasksList: {
    gap: 1,
  },
  taskItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  completedTask: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
  },
  taskMain: {
    flex: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
    flex: 1,
    marginRight: 12,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  completedBy: {
    marginTop: 4,
  },
  completedByText: {
    fontSize: 12,
    color: '#22c55e',
    fontStyle: 'italic',
  },
  requirementsCard: {
    padding: 16,
  },
  requirementsList: {
    gap: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
});

export default ViewGuildQuestScreen;