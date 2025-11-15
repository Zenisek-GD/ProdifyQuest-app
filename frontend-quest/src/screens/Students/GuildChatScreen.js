// src/screens/Students/GuildChatScreen.js
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/Layout/Header';
import BottomNavigation from '../../components/Navigation/BottomNavigation';
import { Card } from '../../components/UI/Card';

const { width } = Dimensions.get('window');

const GuildChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 1,
      userName: 'Alex',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzk_yIdajqOeQH-83GjNTaBE0_YFYHaQNtwhGAJW2wcXkiY7MEl9xDc8NuYxCT7kNGD7TteoTS1J_AYyqy0CnSc-mIpXm07BANXobtG49jORHdrD17X-lxjozqHI9mjetgQZo4mVzR9jDYH28TIUNNR3iqxWzTo-D7y5IYfVVXxeQaMbwk1GPwJdCCo-1hva8q-16GUGApyCftdCMGx_aHwG9-FxveUk0MhVjQ2om73ReF6bT703SU6s7XW99a6RKtAOKgYaDBc-7y',
      text: 'Hey team! Who wants to work on the algorithm challenge together?',
      timestamp: '2:30 PM',
      isCurrentUser: false
    },
    {
      id: 2,
      userId: 2,
      userName: 'Maria',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6QZqI1LafLhqbYE-UkixyPtiX3C3LYfDsdCSGTMie_5XFhYK_UQAFdGnR6MfvtwTZL1-pwLC0gGNGkpiaw1oElnX_QwnUcXpACpFMqBcwZe3juUPgxnivV9XnJVJZcWaz9QCXRlpWS7Y_7I75E6sRjO29WnSaFz_OJe3NRNNiZkVytT6UzorRa9hMGjzTLCAyfacWJCpCD_3Rpt0m3vO85Hml868j8l8FdMVq-Bu7jzWxP932xFLVWJh6AkZKqGydl4x_SQnvmtPf',
      text: "I'm in! I can help with the dynamic programming part.",
      timestamp: '2:32 PM',
      isCurrentUser: false
    },
    {
      id: 3,
      userId: 3,
      userName: 'You',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3F0aHU6-B_TBRBmfIiZAHaSOcPekUOwipXL5AzhmKsdq7T-hU4s4VkWWIjTlkXb54p8vv_b7zlZ0H_32OTP7HaXokUfEj7VgUvSjdvc5NG2EFM9RZw1H1zd8t0N_VX-aCLLKcmNg_fbT6r4U8HZnOZlj8_LvPSst0OHGPhJqo61RLoIAO7LlVBi9_27tkhQcGC_ZXF21M9K2tflk9thzaRhhgg4azXczZbhYr6Z7dEWXiRszBBvtRMWMvQpbmWHEcJ-SlKoVTqSV',
      text: "Great! I'll handle the graph algorithms. When should we schedule our study session?",
      timestamp: '2:35 PM',
      isCurrentUser: true
    },
    {
      id: 4,
      userId: 1,
      userName: 'Alex',
      userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzk_yIdajqOeQH-83GjNTaBE0_YFYHaQNtwhGAJW2wcXkiY7MEl9xDc8NuYxCT7kNGD7TteoTS1J_AYyqy0CnSc-mIpXm07BANXobtG49jORHdrD17X-lxjozqHI9mjetgQZo4mVzR9jDYH28TIUNNR3iqxWzTo-D7y5IYfVVXxeQaMbwk1GPwJdCCo-1hva8q-16GUGApyCftdCMGx_aHwG9-FxveUk0MhVjQ2om73ReF6bT703SU6s7XW99a6RKtAOKgYaDBc-7y',
      text: "How about tomorrow at 6 PM? We can use the voice chat feature.",
      timestamp: '2:38 PM',
      isCurrentUser: false
    }
  ]);

  const flatListRef = useRef();

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        userId: 3,
        userName: 'You',
        userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa3F0aHU6-B_TBRBmfIiZAHaSOcPekUOwipXL5AzhmKsdq7T-hU4s4VkWWIjTlkXb54p8vv_b7zlZ0H_32OTP7HaXokUfEj7VgUvSjdvc5NG2EFM9RZw1H1zd8t0N_VX-aCLLKcmNg_fbT6r4U8HZnOZlj8_LvPSst0OHGPhJqo61RLoIAO7LlVBi9_27tkhQcGC_ZXF21M9K2tflk9thzaRhhgg4azXczZbhYr6Z7dEWXiRszBBvtRMWMvQpbmWHEcJ-SlKoVTqSV',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Scroll to bottom after sending message
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const onlineMembers = [
    {
      id: 1,
      name: 'Alex',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzk_yIdajqOeQH-83GjNTaBE0_YFYHaQNtwhGAJW2wcXkiY7MEl9xDc8NuYxCT7kNGD7TteoTS1J_AYyqy0CnSc-mIpXm07BANXobtG49jORHdrD17X-lxjozqHI9mjetgQZo4mVzR9jDYH28TIUNNR3iqxWzTo-D7y5IYfVVXxeQaMbwk1GPwJdCCo-1hva8q-16GUGApyCftdCMGx_aHwG9-FxveUk0MhVjQ2om73ReF6bT703SU6s7XW99a6RKtAOKgYaDBc-7y',
    },
    {
      id: 2,
      name: 'Maria',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6QZqI1LafLhqbYE-UkixyPtiX3C3LYfDsdCSGTMie_5XFhYK_UQAFdGnR6MfvtwTZL1-pwLC0gGNGkpiaw1oElnX_QwnUcXpACpFMqBcwZe3juUPgxnivV9XnJVJZcWaz9QCXRlpWS7Y_7I75E6sRjO29WnSaFz_OJe3NRNNiZkVytT6UzorRa9hMGjzTLCAyfacWJCpCD_3Rpt0m3vO85Hml868j8l8FdMVq-Bu7jzWxP932xFLVWJh6AkZKqGydl4x_SQnvmtPf',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <Header
        title="Guild Chat"
        subtitle="The Erudite Scholars"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      {/* Online Members */}
      <OnlineMembers members={onlineMembers} />

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChatMessage message={item} />}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      {/* Message Input */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputContent}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#A0AEC0"
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <MaterialIcons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Navigation */}
      <BottomNavigation navigation={navigation} activeTab="Guild" />
    </SafeAreaView>
  );
};

// Sub-components
const OnlineMembers = ({ members }) => (
  <Card style={styles.onlineMembersCard}>
    <View style={styles.onlineMembersContent}>
      <Text style={styles.onlineMembersTitle}>Online Now</Text>
      <View style={styles.membersList}>
        {members.map((member) => (
          <View key={member.id} style={styles.memberPill}>
            <Image source={{ uri: member.avatar }} style={styles.memberPillAvatar} />
            <Text style={styles.memberPillName}>{member.name}</Text>
          </View>
        ))}
      </View>
    </View>
  </Card>
);

const ChatMessage = ({ message }) => (
  <View style={[
    styles.messageContainer,
    message.isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
  ]}>
    {!message.isCurrentUser && (
      <Image source={{ uri: message.userAvatar }} style={styles.messageAvatar} />
    )}
    <View style={[
      styles.messageBubble,
      message.isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
    ]}>
      {!message.isCurrentUser && (
        <Text style={styles.userName}>{message.userName}</Text>
      )}
      <Text style={[
        styles.messageText,
        message.isCurrentUser ? styles.currentUserText : styles.otherUserText
      ]}>
        {message.text}
      </Text>
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  onlineMembersCard: {
    margin: 16,
    marginBottom: 8,
    padding: 12,
  },
  onlineMembersContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  onlineMembersTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  membersList: {
    flexDirection: 'row',
    gap: 8,
  },
  memberPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(106, 77, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  memberPillAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  memberPillName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6a4dff',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesList: {
    paddingVertical: 8,
    gap: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#6a4dff',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6a4dff',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#0f0c1d',
  },
  timestamp: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#f8f9ff',
    borderTopWidth: 1,
    borderTopColor: '#e8e6f2',
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0f0c1d',
    maxHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6a4dff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6a4dff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#A0AEC0',
    shadowColor: '#A0AEC0',
  },
});

export default GuildChatScreen;