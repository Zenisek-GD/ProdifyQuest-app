import React, { useState } from "react";
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
} from "react-native";

const { width, height } = Dimensions.get('window');

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    Alert.alert("Success", "Account created successfully!");
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top White Curve */}
          <View style={styles.topCurve} />

          <View style={styles.formCard}>
            <Text style={styles.title}>CREATE ACCOUNT</Text>

            {/* Full Name */}
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Name"
              placeholderTextColor="#d9c9ff"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
              autoCapitalize="words"
            />

            {/* Email */}
            <Text style={styles.label}>Email/Username:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email or Username"
              placeholderTextColor="#d9c9ff"
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* Password */}
            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="**********"
                placeholderTextColor="#d9c9ff"
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>
                  {isPasswordVisible ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            <Text style={styles.label}>Confirm Password:</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="**********"
                placeholderTextColor="#d9c9ff"
                value={formData.confirmPassword}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
                secureTextEntry={!isConfirmPasswordVisible}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                style={styles.eyeButton}
              >
                <Text style={styles.eyeIcon}>
                  {isConfirmPasswordVisible ? "🙈" : "👁️"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Create Account */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Switch to Login */}
            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Already have an Account? </Text>
              <TouchableOpacity onPress={onSwitchToLogin}>
                <Text style={styles.switchButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Or login with */}
            <Text style={styles.orText}>or login with</Text>

            {/* Google */}
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>🔴 Continue with Google</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialText}>🔵 Continue with Facebook</Text>
            </TouchableOpacity>

            <Text style={styles.policyText}>
              By creating an account, you agree to ProdifyQuest's{'\n'}
              Terms of Service and Privacy Policy.
            </Text>
          </View>

          {/* Bottom White Curve */}
          <View style={styles.bottomCurve} />
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
    backgroundColor: "#4b1fcf",
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
  topCurve: {
    width: width,
    height: height * 0.15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    marginBottom: height * 0.05,
  },
  formCard: {
    width: width * 0.9,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: height * 0.05,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  label: {
    color: "#e7dbff",
    fontSize: width * 0.04,
    marginBottom: 8,
    marginTop: height * 0.02,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#ffffff20",
    borderWidth: 1,
    borderColor: "#ffffff35",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: width * 0.045,
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff20",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffffff35",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: "#fff",
    fontSize: width * 0.045,
  },
  eyeButton: {
    padding: 16,
  },
  eyeIcon: {
    fontSize: width * 0.05,
    color: "#fff",
  },
  registerButton: {
    backgroundColor: "#1E9BFF",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: height * 0.04,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  switchText: {
    color: "#dcd1ff",
    fontSize: width * 0.038,
  },
  switchButtonText: {
    color: "#5CC9FF",
    fontSize: width * 0.038,
    fontWeight: "bold",
  },
  orText: {
    color: "#e5d9ff",
    textAlign: "center",
    marginVertical: height * 0.04,
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#ddd',
  },
  socialText: {
    fontSize: width * 0.04,
    color: "#333",
    fontWeight: "600",
  },
  policyText: {
    marginTop: height * 0.03,
    fontSize: width * 0.03,
    color: "#ddd",
    textAlign: "center",
    lineHeight: 18,
  },
  bottomCurve: {
    width: width * 1.4,
    height: height * 0.2,
    backgroundColor: "#E6E0F8",
    borderTopLeftRadius: 130,
    borderTopRightRadius: 130,
    marginTop: height * 0.05,
  },
});

export default RegisterForm;