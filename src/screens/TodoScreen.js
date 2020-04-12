import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import {THEME} from '../theme'

export const TodoScreen = ({ goBack, todo }) => {
  return (
    <View>
      <Text>
        title todo: {todo.title}, id: {todo.id}
      </Text>

      <View style={styles.buttons}>
        <View style={styles.buttons}>
          <Button title="Back" color={THEME.GREY_COLOR} onPress={goBack} />
        </View>

        <View style={styles.buttons}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={(todo) => {
              console.log("delete: todo with id:", todo.id);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
      width: '40%',

  },
});
