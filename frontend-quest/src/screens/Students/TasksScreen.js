// src/screens/Students/TasksScreen.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  SectionList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton, SecondaryButton } from '../../components/UI/Button';
import { Card, CardHeader, CardTitle } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const TasksScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Today', 'Upcoming', 'Completed'];

  const tasksData = [
    {
      title: 'Today',
      data: [
        {
          id: 1,
          title: 'Complete Math Assignment',
          description: 'Chapter 5 - Calculus',
          dueTime: '11:00 PM',
          priority: 'high',
          completed: false,
          category: 'Academic'
        },
        {
          id: 2,
          title: 'Read History Chapter',
          description: 'World War II - Pages 45-78',
          dueTime: '6:00 PM',
          priority: 'medium',
          completed: false,
          category: 'Academic'
        }
      ]
    },
    {
      title: 'Upcoming',
      data: [
        {
          id: 3,
          title: 'Science Project Research',
          description: 'Physics experiment documentation',
          dueDate: 'Tomorrow',
          priority: 'medium',
          completed: false,
          category: 'Academic'
        },
        {
          id: 4,
          title: 'Group Study Session',
          description: 'Algorithm concepts review',
          dueDate: 'Oct 15',
          priority: 'low',
          completed: false,
          category: 'Academic'
        }
      ]
    },
    {
      title: 'Completed',
      data: [
        {
          id: 5,
          title: 'Morning Exercise',
          description: '30-minute cardio workout',
          completed: true,
          category: 'Personal',
          completedAt: 'Today, 7:00 AM'
        },
        {
          id: 6,
          title: 'English Essay',
          description: '500-word composition',
          completed: true,
          category: 'Academic',
          completedAt: 'Yesterday'
        }
      ]
    }
  ];

  const filteredData = activeFilter === 'All' 
    ? tasksData 
    : tasksData.filter(section => 
        section.title.toLowerCase() === activeFilter.toLowerCase() ||
        (activeFilter === 'Completed' && section.title === 'Completed')
      );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="My Tasks"
        subtitle="Stay organized and productive"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Quick Stats */}
        <QuickStats />

        {/* Filter Tabs */}
        <FilterTabs 
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Tasks List */}
        <TasksList tasksData={filteredData} />

        {/* Add Task Button */}
        <View style={styles.addButtonContainer}>
          <PrimaryButton 
            title="Add New Task" 
            icon="add"
            onPress={() => navigation.navigate('CreateQuest')}
            style={styles.addButton}
          />
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Tasks" />
    </SafeAreaView>
  );
};

// Sub-components
const QuickStats = () => (
  <View style={styles.statsContainer}>
    <StatItem value="8" label="Total" />
    <StatItem value="3" label="Completed" />
    <StatItem value="2" label="Today" />
    <StatItem value="85%" label="Progress" />
  </View>
);

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const FilterTabs = ({ filters, activeFilter, onFilterChange }) => (
  <View style={styles.filterContainer}>
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContent}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.filterTab,
            activeFilter === filter && styles.activeFilterTab
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[
            styles.filterText,
            activeFilter === filter && styles.activeFilterText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const TasksList = ({ tasksData }) => (
  <SectionList
    sections={tasksData}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => <TaskItem task={item} />}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.sectionHeader}>{title}</Text>
    )}
    contentContainerStyle={styles.tasksList}
    showsVerticalScrollIndicator={false}
    style={styles.sectionList}
  />
);

const TaskItem = ({ task }) => (
  <Card style={[styles.taskItem, task.completed && styles.completedTask]}>
    <View style={styles.taskContent}>
      <View style={styles.taskMain}>
        <View style={styles.taskHeader}>
          <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
            {task.title}
          </Text>
          <PriorityBadge priority={task.priority} />
        </View>
        <Text style={[styles.taskDescription, task.completed && styles.completedText]}>
          {task.description}
        </Text>
        <View style={styles.taskMeta}>
          <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(task.category) }]}>
            <Text style={styles.categoryText}>{task.category}</Text>
          </View>
          {task.dueTime && (
            <View style={styles.timeTag}>
              <MaterialIcons name="schedule" size={14} color="#666" />
              <Text style={styles.timeText}>{task.dueTime}</Text>
            </View>
          )}
          {task.dueDate && (
            <View style={styles.timeTag}>
              <MaterialIcons name="calendar-today" size={14} color="#666" />
              <Text style={styles.timeText}>{task.dueDate}</Text>
            </View>
          )}
          {task.completed && (
            <View style={styles.completedTag}>
              <MaterialIcons name="check-circle" size={14} color="#22c55e" />
              <Text style={styles.completedTimeText}>{task.completedAt}</Text>
            </View>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.checkbox, task.completed && styles.checkedBox]}
        onPress={() => console.log('Toggle task', task.id)}
      >
        {task.completed && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
      </TouchableOpacity>
    </View>
  </Card>
);

const PriorityBadge = ({ priority }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return { color: '#ef4444', label: 'High' };
      case 'medium':
        return { color: '#eab308', label: 'Medium' };
      case 'low':
        return { color: '#22c55e', label: 'Low' };
      default:
        return { color: '#666', label: 'Normal' };
    }
  };

  const config = getPriorityConfig(priority);
  
  return (
    <View style={[styles.priorityBadge, { backgroundColor: `${config.color}20` }]}>
      <View style={[styles.priorityDot, { backgroundColor: config.color }]} />
      <Text style={[styles.priorityText, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
};

// Helper function
const getCategoryColor = (category) => {
  const colors = {
    Academic: '#dbeafe',
    Personal: '#dcfce7',
    Health: '#fef3c7',
    Social: '#f3e8ff'
  };
  return colors[category] || '#e5e7eb';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a4dff',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  filterContainer: {
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterContent: {
    gap: 8,
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    minHeight: 32,
    justifyContent: 'center',
  },
  activeFilterTab: {
    backgroundColor: '#6a4dff',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#0f0c1d',
  },
  activeFilterText: {
    color: '#fff',
  },
  sectionList: {
    flex: 1,
  },
  tasksList: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginTop: 16,
    marginBottom: 8,
  },
  taskItem: {
    marginBottom: 12,
  },
  completedTask: {
    opacity: 0.7,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  taskMain: {
    flex: 1,
    marginRight: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0c1d',
    flex: 1,
    marginRight: 8,
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
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  completedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#dcfce7',
    borderRadius: 6,
  },
  completedTimeText: {
    fontSize: 12,
    color: '#166534',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  checkedBox: {
    backgroundColor: '#6a4dff',
    borderColor: '#6a4dff',
  },
  addButtonContainer: {
    padding: 16,
    paddingTop: 0,
  },
  addButton: {
    width: '100%',
  },
});

export default TasksScreen;