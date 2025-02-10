import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth, signInWithEmailAndPassword } from "../screens/Firebase"; // Import from the firebaseConfig.js file
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      navigation.navigate("Profile"); // Navigate to profile page after successful login
    } catch (e) {
      setError("Login failed! " + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#6B7280" // Tailwind gray-500
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#6B7280" // Tailwind gray-500
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.footerLink}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFB59E",
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#B4ADA3",
    color: "#4B5563",
    backgroundColor: "#E5E7EB",
  },
  button: {
    width: "100%",
    backgroundColor: "#C4B1AE",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  footerLink: {
    color: "#BFB59E",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
