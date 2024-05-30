import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme_darkMode } from "../context/theme-darkMode";
import CustomAlert from '../components/Alert'; // Import the custom alert component

export default function TasksScreen() {
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode } = useTheme_darkMode();

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const addTask = (selectedDate) => {
    if (taskInput.trim() === '' || !selectedDate) {
      return;
    }
    setTasks(prevTasks => [...prevTasks, { id: Date.now().toString(), text: taskInput, dueDate: selectedDate, completed: false }]);
    setTaskInput('');
    setDueDate(null);
    setShowDatePicker(false);
  };

  const deleteTask = id => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const markTaskAsCompleted = id => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set the time to midnight for comparison
      if (selectedDate < today) {
        setAlertMessage("The due date cannot be before today's date.");
        setAlertVisible(true);
      } else {
        addTask(selectedDate);
      }
    }
  };

  return (
    <GlobalLayout>
      <GestureHandlerRootView>
        <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
          <View style={{ flexDirection: 'row', marginBottom: 20, padding: 20, paddingTop: 40 }}>
            <TextInput
              style={[globalStyles.text, globalStyles_darkMode.inputText, { flex: 1, borderWidth: 2, padding: 10, paddingLeft: 20, marginRight: 10, borderRadius: 30 }]}
              placeholder="Enter Task"
              placeholderTextColor={isDarkMode ? "#999" : "#ccc"}
              value={taskInput}
              onChangeText={setTaskInput}
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDate}
                style={styles.dateTimePicker}
                themeVariant="dark"
              />
            )}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              disabled={taskInput.trim() === ''}
              style={[styles.plusButton, globalStyles_darkMode.button, taskInput.trim() === '' && styles.disabledButton]}
            >
              <Icon name="plus" size={20} style={[globalStyles_darkMode.buttonText]} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(item => (
              <Swipeable
                key={item.id}
                onSwipeableOpen={(direction, Swipeable) => {
                  if (direction === 'left') {
                    markTaskAsCompleted(item.id);
                    Swipeable.close();
                  } else if (direction === 'right') {
                    deleteTask(item.id);
                    Swipeable.close();
                  }
                }}
                renderLeftActions={() => (
                  <TouchableOpacity style={styles.completedButton}>
                    <Icon name={item.completed ? "times" : "check"} size={20} color="white" />
                  </TouchableOpacity>
                )}
                renderRightActions={() => (
                  <TouchableOpacity style={styles.deleteButton}>
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                )}
              >
                <View style={[styles.taskItem, item.completed && styles.completedTask]}>
                  <Text style={[styles.taskText, item.completed && styles.completedText, globalStyles.text, globalStyles_darkMode.text]}>{item.text}</Text>
                  <Text style={[styles.taskText, item.completed && styles.completedText, globalStyles_darkMode.text]}>{item.dueDate && item.dueDate.toString().substring(0, 15)}</Text>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
        </View>
      </GestureHandlerRootView>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
        isDarkMode={isDarkMode}
      />
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f5f7',
  },
  containerDarkMode: {
    backgroundColor: '#121212',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  completedTask: {
    // Add any specific styles for completed tasks if needed
  },
  completedText: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,

  },
  completedButton: {
    backgroundColor: 'green',
    justifyContent:
      'center',
    alignItems: 'center',
    width: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  plusButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  dateTimePicker: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
  },
});
