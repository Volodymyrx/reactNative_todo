import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";

export default function App() {
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    { id: "1", title: "Study React Native" },
    { id: "2", title: "Write code Application" },
  ]);

  const addTodo = (title) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
      },
    ]);
  };
  const removeTodo = (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    Alert.alert(
      "Delete?",
      `Do you sure want to delete "${currentTodo.title}"?`,
      [
        {
          text: "Delete",
          // onPress: () => console.log('delete sure!'),
          onPress: () => {
            setTodoId(null)
            setTodos((prev) => prev.filter((todo) => todo.id !== id));
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("pressed cancel delete"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const openTodo = (id) => {
    setTodoId(id);
  };
  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={openTodo}
    />
  );
  if (todoId) {
    let selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
      />
    );
  }

  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
