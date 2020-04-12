import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { Navbar } from "./src/components/Navbar";
import { MainScreen } from "./src/screens/MainScreen";
import { TodoScreen } from "./src/screens/TodoScreen";


export default function App() {
  const [todoId, setTodoId] = useState('2')
  const [todos, setTodos] = useState([
{ id: '1', title: 'Study React Native'},
{ id: '2', title: 'Write code Application'},
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
  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const openTodo = id => {
    
    setTodoId(id)
  }
let content = <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={openTodo}/>
if (todoId){
  let selectedTodo = todos.find(todo => todo.id === todoId)
  content = <TodoScreen goBack={()=>setTodoId(null)} todo={selectedTodo} />
}



  return (
    <View>
      <Navbar title="Todo App!" />
      <View style={styles.container}>
      {content}
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});















