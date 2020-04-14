import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";
import { THEME } from "./src/theme";

async function loadApplication() {
  await Font.loadAsync({
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
}

export default function App() {
  const [isReady, setIsRaady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    { id: "1", title: "Study React Native" }, // temp for test
  ]);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={(err) => console.log("error", err)}
        onFinish={() => setIsRaady(true)}
      />
    );
  }

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
            setTodoId(null);
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
  const updateTodo = (id, title) => {
    setTodos((old) =>
      old.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      })
    );
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
        onSave={updateTodo}
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
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
  },
});
