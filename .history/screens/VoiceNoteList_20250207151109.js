import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";

const VoiceNoteList = ({ voiceNotes, onDelete, onPlay, onUpdate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const handleUpdateName = (item) => {
    setSelectedId(item.id);
    setNewName(item.name);
    setModalVisible(true);
  };

  const updateName = () => {
    if (newName.trim()) {
      onUpdate(selectedId, newName);
    }
    setModalVisible(false);
    setNewName("");
    setSelectedId(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={voiceNotes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteName}>{item.name}</Text>
            <Text style={styles.noteDate}>{item.date}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onPlay(item.uri)}
              >
                <Text style={styles.buttonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdateName(item)}
              >
                <Text style={styles.buttonText}>Update Name</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Update Name Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Audio Name</Text>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
            />
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                color="red"
                onPress={() => setModalVisible(false)}
              />
              <Button title="Update" onPress={updateName} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
  },
  noteContainer: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#4F46E5",
    borderRadius: 8,
    backgroundColor: "#E0F2FE",
  },
  noteName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  noteDate: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default VoiceNoteList;
