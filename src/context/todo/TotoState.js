import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR } from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (title) => dispatch({ type: ADD_TODO, title });
  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });
  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Delete?",
      `Do you sure want to delete "${todo.title}"?`,
      [
        {
          text: "Delete",
          // onPress: () => console.log('delete sure!'),
          onPress: () => {
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
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

const showLoader = () => dispatch({type: SHOW_LOADER})
const hideLoader = () => dispatch({type: HIDE_LOADER})
const showError = (error) => dispatch({type: SHOW_ERROR, error })
const clearError = () => dispatch({type: CLEAR_ERROR})


  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        updateTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
