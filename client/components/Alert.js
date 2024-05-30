import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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
          <Text style={[styles.modalText, isDarkMode && styles.modalTextDark]}>{message}</Text>
          <TouchableOpacity
            style={[styles.button, isDarkMode && styles.buttonDark]}
            onPress={onClose}
          >
            <Text style={[styles.textStyle, isDarkMode && styles.textStyleDark]}>OK</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  },
  modalViewDark: {
    backgroundColor: '#333',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalTextDark: {
    color: '#fff',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonDark: {
    backgroundColor: '#555',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleDark: {
    color: '#ddd',
  },
});

export default CustomAlert;
