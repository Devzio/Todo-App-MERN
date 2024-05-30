import React from 'react';
import { View, Text, Modal, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, message, onClose, isDarkMode }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isDarkMode && styles.modalViewDark]}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={[styles.modalText, isDarkMode && styles.modalTextDark]}>
              {message}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, isDarkMode && styles.buttonCloseDark]}
            onPress={onClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 500
  },
  modalViewDark: {
    backgroundColor: '#333',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
  },
  modalTextDark: {
    color: '#fff',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonCloseDark: {
    backgroundColor: '#12747c',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomAlert;
