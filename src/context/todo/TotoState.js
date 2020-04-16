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
    const response = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    console.log("id", data.name);
    const id = data.name;
    //  fetchTodos()
    dispatch({ type: ADD_TODO, title, id });
  };

  const fetchTodos = async () => {
    // showLoader()
    clearError();
    try {
      const response = await fetch(uri, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
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
      await fetch(`https://react-1f1bd.firebaseio.com/todos/${id}.json`, {
        method: "PUTCH",
        headers: { "Content-Type": "applicatin/json" },
        body: JSON.stringify({ title }),
      });
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
          // onPress: () => console.log('delete sure!'),
          onPress: async () => {
            changeScreen(null);
            // my knolage
            try {
              await fetch(
                `https://react-1f1bd.firebaseio.com/todos/${id}.json`,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "applicatin/json" },
                }
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              SHOW_ERROR("Some thing wrong ...");
              console.log(e);
            }

            // my end knolage
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
