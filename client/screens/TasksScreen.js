import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TasksScreen() {
  const globalStyles = GlobalStyles();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      addTask(selectedDate);
    }
  };

  return (
    <GlobalLayout>
      <GestureHandlerRootView>
        <View style={{ flex: 1, padding: 0, backgroundColor: '#faf0e6' }}>
          {/* <Text style={[globalStyles.text, { paddingHorizontal: 20 }]}>Task Management App</Text> */}
          <View style={{ flexDirection: 'row', marginBottom: 20, padding: 20 }}>
            <TextInput
              style={[globalStyles.text, { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, paddingLeft: 20, marginRight: 10, borderRadius: 30 }]}
              placeholder="Enter Task"
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
              />
            )}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              disabled={taskInput.trim() === ''}
              style={[styles.plusButton, taskInput.trim() === '' && styles.disabledButton]}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map(item => (
              <Swipeable
                key={item.id}
                onSwipeableOpen={(direction, Swipeable) => {
                  if (direction === 'right') {
                    markTaskAsCompleted(item.id);
                    Swipeable.close();
                  } else if (direction === 'left') {
                    deleteTask(item.id);
                    Swipeable.close();
                  }
                }}
                renderLeftActions={() => (
                  <TouchableOpacity style={styles.deleteButton}>
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                )}
                renderRightActions={() => (
                  <TouchableOpacity style={styles.completedButton}>
                    <Icon name={item.completed ? "times" : "check"} size={20} color="white" />
                  </TouchableOpacity>
                )}
              >
                <View style={[styles.taskItem, item.completed && styles.completedTask]}>
                  <Text style={[styles.taskText, item.completed && styles.completedText, globalStyles.text]}>{item.text}</Text>
                  <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.dueDate && item.dueDate.toString().substring(0, 15)}</Text>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
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
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  completedButton: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
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
});