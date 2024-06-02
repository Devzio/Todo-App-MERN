// client/screens/TasksScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { GlobalStyles_darkMode } from "../styles/global-darkMode";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme_darkMode } from "../context/theme-darkMode";
import CustomAlert from '../components/Alert'; // Import the custom alert component
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function TasksScreen() {
  const globalStyles = GlobalStyles();
  const globalStyles_darkMode = GlobalStyles_darkMode();
  const { isDarkMode } = useTheme_darkMode();

  const [tasks, setTasks] = useState({});
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Get the stored userId
        const response = await fetch(`http://172.24.40.17:3000/tasks/${userId}`);
        const data = await response.json();

        const tasksObj = {};
        data.forEach(task => {
          tasksObj[task.id] = {
            ...task,
            dueDate: new Date(task.dueDate).toString(),
            completed: Boolean(task.completed)
          };
        });
        setTasks(tasksObj);
      } catch (error) {
        setAlertMessage("Failed to load tasks.");
        setAlertVisible(true);
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (selectedDate) => {
    if (taskInput.trim() === '' || !selectedDate) {
      return;
    }

    const userId = await AsyncStorage.getItem('userId'); // Get the stored userId

    const newTask = {
      userId,  // Use the stored userId
      text: taskInput,
      dueDate: selectedDate.toString(),
      completed: 0
    };

    try {
      const response = await axios.post(`http://172.24.40.17:3000/tasks/`, newTask);
      const savedTask = response.data;
      setTasks(prevTasks => ({ ...prevTasks, [savedTask.id]: { ...savedTask, dueDate: new Date(savedTask.dueDate).toString() } }));
      setTaskInput('');
      setDueDate(null);
      setShowDatePicker(false);
    } catch (error) {
      setAlertMessage("Failed to add task.");
      setAlertVisible(true);
      console.error(error);
    }
  };


  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://172.24.40.17:3000/tasks/${id}`);
      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };
        delete updatedTasks[id];
        return updatedTasks;
      });
    } catch (error) {
      setAlertMessage("Failed to delete task.");
      setAlertVisible(true);
      console.error(error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      await axios.put(`http://172.24.40.17:3000/tasks/${id}`, { completed: !completed });
      setTasks(prevTasks => ({
        ...prevTasks,
        [id]: { ...prevTasks[id], completed: !completed }
      }));
    } catch (error) {
      setAlertMessage("Failed to update task completion status.");
      setAlertVisible(true);
      console.error(error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set' && selectedDate) {
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

  const sortedTasks = Object.values(tasks).sort((a, b) => {
    if (a.completed === b.completed) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return a.completed ? 1 : -1;
  });

  return (
    <GlobalLayout>
      <GestureHandlerRootView>
        <View style={[styles.container, isDarkMode && styles.containerDarkMode]}>
          <View style={[styles.taskInputContainer]}>
            <TextInput
              style={[styles.taskInputBox, globalStyles.text, globalStyles_darkMode.inputText]}
              placeholder="Enter Task"
              placeholderTextColor={isDarkMode ? "#999" : "#A7A7A7"}
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
          {Object.keys(tasks).length === 0 ? (
            <View className="flex-column justify-center items-center h-3/4">
              <Image style={styles.noTasksImage} source={require('../assets/images/lightbulb_notasks.png')} />
              <Text style={[styles.noTasksText, globalStyles.text, globalStyles_darkMode.text]}>
                You have no Tasks Added
              </Text>
              <Text style={[styles.noTasksTextSmall, globalStyles_darkMode.text]}>
                Go Ahead, Add one right now.{"\n"} You can swipe Right to check, uncheck it.{"\n"} Swipe Left to delete it.
              </Text>
            </View>

          ) : (
            <ScrollView>
              {sortedTasks.map(item => (
                <Swipeable
                  key={item.id}
                  onSwipeableOpen={(direction, Swipeable) => {
                    if (direction === 'left') {
                      toggleTaskCompletion(item.id, item.completed);
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
                    <Text style={[styles.taskText, globalStyles.text, globalStyles_darkMode.text, item.completed && globalStyles_darkMode.completedText]}>{item.text}</Text>
                    <Text style={[styles.dateText, globalStyles_darkMode.text, item.completed && globalStyles_darkMode.completedText]}>{item.dueDate && item.dueDate.toString().substring(0, 15)}</Text>
                  </View>
                </Swipeable>
              ))}
            </ScrollView>
          )}
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
  taskInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 20,
    paddingTop: 40
  },
  taskInputBox: {
    flex: 1,
    borderWidth: 2,
    padding: 10,
    paddingLeft: 20,
    marginRight: 10,
    borderRadius: 30,
    color: 'red'
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
    width: 60,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  completedButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto',

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
    backgroundColor: '#ccc',
  },
  dateTimePicker: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
  },
  noTasksText: {
    textAlign: 'center',
    marginTop: 20,
  },
  noTasksTextSmall: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noTasksImage: {
    height: 150,
    objectFit: 'contain',
    resizeMode: 'contain'
  },
  taskText: {
    width: '70%',
  },
});
