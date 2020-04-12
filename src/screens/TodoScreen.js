import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <Text>
        title todo: {todo.title}, id: {todo.id}
      </Text>

      <View>
        <Button title="Back" onPress={goBack} />
        <Button
          title="Delete"
          color="#ff0000"
          onPress={(todo) => {
            console.log("delete: todo with id:", todo.id);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
