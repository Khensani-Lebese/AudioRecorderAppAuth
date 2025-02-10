import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { auth, createUserWithEmailAndPassword } from "../screens/Firebase"; // Import from the firebaseConfig.js file
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
      navigation.navigate("Login");
    } catch (e) {
      setError("Registration failed! " + e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Audio Recording App</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#6B7280"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.footerLink}>Already have an account? Log in</Text>
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
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
    color: "#858786",
    textAlign: "center",
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
  },

  label: {
    marginBottom: 8,
    alignSelf: "flex-start",
    color: "#CAB7A2",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#858786",
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
    color: "#CAB7A2",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default RegisterScreen;
