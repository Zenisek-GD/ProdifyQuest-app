// src/screens/Students/RewardsShopScreen.js
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
  FlatList
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { PrimaryButton } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const RewardsShopScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Study Boosts', 'Break Time', 'Fun', 'Custom'];
  
  const rewards = [
    {
      id: 1,
      emoji: '☕',
      name: 'Coffee Break',
      price: 50,
      category: 'Break Time'
    },
    {
      id: 2,
      emoji: '📱',
      name: '15-min Phone Time',
      price: 25,
      category: 'Break Time'
    },
    {
      id: 3,
      emoji: '🎧',
      name: 'Study Boost',
      price: 40,
      category: 'Study Boosts'
    },
    {
      id: 4,
      emoji: '🎁',
      name: 'Custom Reward',
      price: 35,
      category: 'Custom'
    },
    {
      id: 5,
      emoji: '📺',
      name: 'Netflix Break – 30 min',
      price: 30,
      category: 'Fun',
      disabled: true
    }
  ];

  const filteredRewards = activeFilter === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.category === activeFilter);

  const rightAction = (
    <TouchableOpacity style={styles.profileButton}>
      <MaterialIcons name="account-circle" size={24} color="#6a4dff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Rewards Shop"
        subtitle="Exchange coins for rewards"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightAction={rightAction}
      />

      {/* Currency Bar */}
      <CurrencyBar />

      {/* Filter Tabs */}
      <FilterTabs 
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Rewards Grid */}
      <RewardsGrid rewards={filteredRewards} />

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Rewards" />
    </SafeAreaView>
  );
};

// Sub-components
const CurrencyBar = () => (
  <Card style={styles.currencyBar}>
    <View style={styles.currencyContent}>
      <View style={styles.currencyItem}>
        <Text style={styles.currencyEmoji}>🪙</Text>
        <Text style={styles.currencyAmount}>245 coins</Text>
      </View>
      <View style={styles.currencyItem}>
        <MaterialIcons name="bolt" size={20} color="#40E0D0" />
        <Text style={styles.currencyAmount}>1200 XP</Text>
      </View>
    </View>
  </Card>
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
          <Text 
            style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}
            numberOfLines={1}
          >
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const RewardsGrid = ({ rewards }) => (
  <FlatList
    data={rewards}
    numColumns={2}
    keyExtractor={(item) => item.id.toString()}
    contentContainerStyle={styles.rewardsGrid}
    renderItem={({ item }) => <RewardCard reward={item} />}
    showsVerticalScrollIndicator={false}
  />
);

const RewardCard = ({ reward }) => (
  <Card style={styles.rewardCard}>
    <View style={styles.rewardContent}>
      <View style={styles.rewardIcon}>
        <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
      </View>
      <View style={styles.rewardInfo}>
        <Text style={styles.rewardName}>{reward.name}</Text>
        <View style={styles.priceTag}>
          <Text style={styles.priceEmoji}>🪙</Text>
          <Text style={styles.priceText}>{reward.price}</Text>
        </View>
      </View>
      <PrimaryButton 
        title="Redeem" 
        onPress={() => console.log('Redeem', reward.name)}
        style={[
          styles.redeemButton,
          reward.disabled && styles.disabledButton
        ]}
        disabled={reward.disabled}
      />
    </View>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7ff',
  },
  profileButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  currencyBar: {
    margin: 16,
    marginVertical: 8,
  },
  currencyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyEmoji: {
    fontSize: 20,
  },
  currencyAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f0d1c',
  },
  filterContainer: {
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterContent: {
    gap: 6,
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(106, 76, 255, 0.2)',
    minHeight: 32,
    justifyContent: 'center',
    minWidth: 70,
  },
  activeFilterTab: {
    backgroundColor: '#6a4dff',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0f0d1c',
    textAlign: 'center',
  },
  activeFilterText: {
    color: '#fff',
  },
  rewardsGrid: {
    padding: 16,
    gap: 16,
  },
  rewardCard: {
    flex: 1,
    margin: 4,
    shadowColor: '#6a4dff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  rewardContent: {
    alignItems: 'center',
  },
  rewardIcon: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: 'rgba(106, 76, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardEmoji: {
    fontSize: 24,
  },
  rewardInfo: {
    marginBottom: 16,
    alignItems: 'center',
  },
  rewardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f0d1c',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  priceEmoji: {
    fontSize: 12,
  },
  priceText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#854d0e',
  },
  redeemButton: {
    width: '100%',
  },
  disabledButton: {
    backgroundColor: 'rgba(106, 76, 255, 0.5)',
  },
});

export default RewardsShopScreen;