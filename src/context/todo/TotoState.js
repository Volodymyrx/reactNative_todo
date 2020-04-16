import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from "../types";
import { ScreenContext } from "../screen/screenContext";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const uri = "https://react-1f1bd.firebaseio.com/todos.json";

  const addTodo = async (title) => {
    const data = await Http.post(
      "https://react-1f1bd.firebaseio.com/todos.json",
      { title }
    );
    dispatch({ type: ADD_TODO, title, id: data.name });
  };

  const fetchTodos = async () => {
    // showLoader()
    clearError();
    try {
      
      const data = await Http.get("https://react-1f1bd.firebaseio.com/todos.json")
      const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError("Some thing wrong...");
      console.log(e);
    } finally {
      // hideLoader()
    }
  };

  const updateTodo = async (id, title) => {
    // showLoader()
    clearError();
    try {

      await Http.patch(`https://react-1f1bd.firebaseio.com/todos/${id}.json`, {title})
      dispatch({ type: UPDATE_TODO, title, id });
    } catch (e) {
      SHOW_ERROR("Some thing wrong ...");
      console.log(e);
    } finally {
      // hideLoader()
    }
    dispatch({ type: UPDATE_TODO, id, title });
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Delete?",
      `Do you sure want to delete "${todo.title}"?`,
      [
        {
          text: "Delete",
          onPress: async () => {
            changeScreen(null);
            try {
              await Http.delete(`https://react-1f1bd.firebaseio.com/todos/${id}.json`)
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              SHOW_ERROR("Some thing wrong ...");
              console.log(e);
            }
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

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        updateTodo,
        removeTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
