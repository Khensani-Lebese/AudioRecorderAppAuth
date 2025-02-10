import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../screens/Firebase"; // Ensure this imports your initialized Firebase app

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, set user details
        setUserDetails({
          email: user.email,
          uid: user.uid,
        });
      } else {
        // No user is signed in, navigate to login
        navigation.navigate("Login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <Text style={styles.welcomeText}>
            User with the email: {userDetails.email} is logged in!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Recorder")}
          >
            <Text style={styles.buttonText}>View Recordings</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading user details...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFB59E",
    justifyContent: "center",
  },

  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeText: {
    fontSize: 24,
    marginBottom: 10,
    color: "#CAB7A2",
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#4B5563",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#858786",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
  },
});

export default ProfileScreen;
