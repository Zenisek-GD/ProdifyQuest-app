import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    Alert.alert('Success', 'Login successful!');
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Curved White Top Card - Full Width */}
          <View style={styles.headerCard}>
            <Text style={styles.appTitle}>Welcome to</Text>
            <Text style={styles.brand}>
              <Text style={{ fontWeight: '800' }}>PRODIFY</Text>
              <Text style={{ color: '#007BFF', fontWeight: '800' }}>QUEST!</Text>
            </Text>
            <Text style={styles.tagline}>
              Learn, Achieve, and Level Up!
            </Text>
          </View>

          {/* Form - Full Width */}
          <View style={styles.formCard}>
            <Text style={styles.label}>Email/Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email or Username"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="********"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text style={styles.eye}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.rememberRow}>
              <Text style={styles.rememberText}>☑ Remember Me</Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.signUpText}>
              Don't have an Account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={onSwitchToRegister}
              >
                Sign Up
              </Text>
            </Text>

            {/* Divider */}
            <Text style={styles.orLogin}>or login with</Text>

            {/* Google Button */}
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>🔴  Continue with Google</Text>
            </TouchableOpacity>

            {/* Facebook Button */}
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>🔵  Continue with Facebook</Text>
            </TouchableOpacity>

            <Text style={styles.policyText}>
              By continuing with the service above, you agree to{'\n'}
              ProdifyQuest's Terms of Service and Privacy Policy.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#4B2FFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height,
  },
  headerCard: {
    width: width,
    backgroundColor: '#fff',
    paddingVertical: height * 0.06,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    marginBottom: height * 0.03,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  appTitle: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: '600',
  },
  brand: {
    fontSize: width * 0.07,
    color: '#222',
    marginTop: 5,
    fontWeight: '700',
  },
  tagline: {
    fontSize: width * 0.035,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  formCard: {
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: height * 0.05,
  },
  label: {
    color: '#fff',
    fontSize: width * 0.04,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 16,
    borderRadius: 12,
    fontSize: width * 0.045,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    alignItems: 'center',
    paddingRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: width * 0.045,
    color: '#fff',
  },
  eye: {
    fontSize: 22,
    color: '#fff',
  },
  rememberRow: {
    marginVertical: 15,
  },
  rememberText: {
    color: '#fff',
    fontSize: width * 0.038,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#0095FF',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  signUpText: {
    textAlign: 'center',
    color: '#ddd',
    marginTop: 25,
    fontSize: width * 0.038,
  },
  signUpLink: {
    color: '#00C3FF',
    fontWeight: '700',
  },
  orLogin: {
    textAlign: 'center',
    color: '#eee',
    marginVertical: 25,
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  socialButton: {
    backgroundColor: '#ffffffee',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialText: {
    fontSize: width * 0.04,
    color: '#333',
    fontWeight: '600',
  },
  policyText: {
    marginTop: 25,
    fontSize: width * 0.03,
    color: '#ddd',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginForm;