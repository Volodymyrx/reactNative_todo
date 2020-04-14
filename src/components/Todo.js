import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "../ui/AppText";

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <View style={slyles.todo}>
        <AppText>
          {todo.title}, id: {todo.id}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const slyles = StyleSheet.create({
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
