import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity 
    activeOpacity={0.5} 
    onPress={()=>onOpen(todo.id)}
    onLongPress={() => onRemove(todo.id)}
    >
      <View style={slyles.todo}>
        <Text>
          {todo.title}, id: {todo.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const slyles = StyleSheet.create({
  text: {},
  todo: {
    flexDirection: "row",
    alignContent: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 5,
    marginBottom: 10,
  },
});
