// src/screens/Students/GuildScreen.js
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

const GuildScreen = ({ navigation }) => {
  const members = [
    {
      id: 1,
      name: 'Alex',
      status: 'Online',
      level: 15,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzk_yIdajqOeQH-83GjNTaBE0_YFYHaQNtwhGAJW2wcXkiY7MEl9xDc8NuYxCT7kNGD7TteoTS1J_AYyqy0CnSc-mIpXm07BANXobtG49jORHdrD17X-lxjozqHI9mjetgQZo4mVzR9jDYH28TIUNNR3iqxWzTo-D7y5IYfVVXxeQaMbwk1GPwJdCCo-1hva8q-16GUGApyCftdCMGx_aHwG9-FxveUk0MhVjQ2om73ReF6bT703SU6s7XW99a6RKtAOKgYaDBc-7y',
      online: true
    },
    {
      id: 2,
      name: 'Maria',
      status: 'Online',
      level: 12,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6QZqI1LafLhqbYE-UkixyPtiX3C3LYfDsdCSGTMie_5XFhYK_UQAFdGnR6MfvtwTZL1-pwLC0gGNGkpiaw1oElnX_QwnUcXpACpFMqBcwZe3juUPgxnivV9XnJVJZcWaz9QCXRlpWS7Y_7I75E6sRjO29WnSaFz_OJe3NRNNiZkVytT6UzorRa9hMGjzTLCAyfacWJCpCD_3Rpt0m3vO85Hml868j8l8FdMVq-Bu7jzWxP932xFLVWJh6AkZKqGydl4x_SQnvmtPf',
      online: true
    },
    {
      id: 3,
      name: 'Sam',
      status: 'Offline',
      level: 11,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrIjFMqghAnfH6zdIfrec53Ra6l8cB_aDRbkgHi9BQ8Ux0cCG2a7vAy0RJP78XBX3tBqvl76T3E_x3r3PQNznNlIsve0zWlKtNUg8BFHHvPIBn9HO6fW3yozcr2MqSAkPrdib7ojvfHSJ83D5dk2yUnQUds4MC4kZPHG7FCl0iiheiqTvcftGVtqqzDKTChJgT5x5UMlqBk4rJ487OU7D8Pj7XlFGvMHuS7T9tnWcWmb7CutjEgWj8yK2NM_6nFd-3eUlxPSHumJx4',
      online: false
    }
  ];

  const rightAction = (
    <TouchableOpacity style={styles.headerButton}>
      <MaterialIcons name="group" size={24} color="#0f0c1d" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="My Guild"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightAction={rightAction}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Guild Banner */}
        <GuildBanner />

        {/* Guild Quest */}
        <GuildQuest navigation={navigation} />

        {/* Members Section */}
        <MembersSection members={members} />

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <PrimaryButton 
            title="Create Guild Quest" 
            onPress={() => navigation.navigate('CreateGuildQuest')}
          />
          <SecondaryButton 
            title="Open Guild Chat" 
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
const GuildBanner = () => (
  <Card style={styles.guildBanner}>
    <Image 
      source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-1-xlflIqJgRo2bjkoUaMwidoyJVqTk3hMYHz6NXbhSt7c76RWa2dGEOexb9iJ8DvRBkBEoi5YPoHn0Htyfs_MmG45tKhegTKRMNdq2jdN--gl_fscEnoHNMXX3jcGIFhNdINaP6ko3jEiQ_XUFGQQv5VndMyYlJUAfH1GpFX2BtUIIC3NSZ6TbGrs2heesqsfuB4Q5sey7zOArUr60UVPNDvz3ZZaW66MHovAoU7F2jtoymxM4om7lfPyxeF-sCkYqlo5M8hFRm" }}
      style={styles.bannerImage}
    />
    <View style={styles.guildInfo}>
      <Text style={styles.guildName}>The Erudite Scholars</Text>
      <Text style={styles.guildDescription}>Active study guild</Text>
    </View>
    <View style={styles.statsContainer}>
      <StatItem value="12" label="Members" />
      <StatItem value="45d" label="Streak" />
      <StatItem value="12.5k" label="Guild XP" />
    </View>
  </Card>
);

const StatItem = ({ value, label }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const GuildQuest = ({ navigation }) => (
  <Card style={styles.questCard}>
    <CardTitle style={styles.questTitle}>Current Guild Quest</CardTitle>
    <Text style={styles.questDescription}>Master the Algorithm Challenge</Text>
    
    <View style={styles.progressContainer}>
      <View style={styles.progressLabels}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={styles.progressValue}>5/10 tasks</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: '50%' }]} />
      </View>
      <Text style={styles.questMotivation}>Keep up the great work, team!</Text>
    </View>
    
    <PrimaryButton 
      title="View Quest" 
      onPress={() => navigation.navigate('ViewGuildQuest')}
      style={styles.questButton}
    />
  </Card>
);

const MembersSection = ({ members }) => (
  <View style={styles.membersSection}>
    <Text style={styles.membersTitle}>Members (12)</Text>
    <View style={styles.membersList}>
      {members.map((member) => (
        <MemberItem key={member.id} member={member} />
      ))}
    </View>
  </View>
);

const MemberItem = ({ member }) => (
  <Card style={styles.memberItem}>
    <View style={styles.memberContent}>
      <View style={styles.memberAvatarContainer}>
        <Image source={{ uri: member.avatar }} style={styles.memberAvatar} />
        {member.online && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberStatus}>{member.status}</Text>
      </View>
      <View style={styles.levelBadge}>
        <MaterialIcons name="star" size={16} color="#eab308" />
        <Text style={styles.levelText}>Lv. {member.level}</Text>
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
    padding: 16,
  },
  headerButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  guildBanner: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: 100,
  },
  guildInfo: {
    padding: 16,
    paddingBottom: 8,
  },
  guildName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0c1d',
  },
  guildDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e6f2',
    borderRadius: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f0c1d',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  questCard: {
    marginBottom: 16,
  },
  questTitle: {
    marginBottom: 12,
  },
  questDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f0c1d',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(106, 77, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6a4dff',
    borderRadius: 4,
  },
  questMotivation: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  questButton: {
    width: '100%',
  },
  membersSection: {
    marginBottom: 16,
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0c1d',
    marginBottom: 12,
  },
  membersList: {
    gap: 12,
  },
  memberItem: {
    padding: 12,
  },
  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f0c1d',
  },
  memberStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#eab308',
  },
  actionButtons: {
    gap: 12,
    paddingTop: 8,
  },
});

export default GuildScreen;