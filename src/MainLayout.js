import React, { useState, useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import {ScreenContext} from './context/screen/screenContext'

export const MainLayout = () => {
  const {todos,addTodo,updateTodo,removeTodo} = useContext(TodoContext);
  const {todoId, changeScreen} = useContext(ScreenContext)

//   const removeTodo = (id) => {
//     const currentTodo = todos.find((todo) => todo.id === id);
//     Alert.alert(
//       "Delete?",
//       `Do you sure want to delete "${currentTodo.title}"?`,
//       [
//         {
//           text: "Delete",
//           // onPress: () => console.log('delete sure!'),
//           onPress: () => {
//             setTodoId(null);
//             setTodos((prev) => prev.filter((todo) => todo.id !== id));
//           },
//           style: "destructive",
//         },
//         {
//           text: "Cancel",
//           onPress: () => console.log("pressed cancel delete"),
//           style: "cancel",
//         },
//       ],
//       { cancelable: false }
//     );
//   };


  // const openTodo = (id) => {
  //   setTodoId(id);
  // };

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={changeScreen}
    />
  );
  if (todoId) {
    let selectedTodo = todos.find((todo) => todo.id === todoId);
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => changeScreen(null)}
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
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
  },
});
