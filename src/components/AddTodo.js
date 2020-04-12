import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Alert } from "react-native";
import { THEME } from "../theme";

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value);
      setValue("");
    } else {
      Alert.alert("Name of todo can not be empty");
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        // onChangeText={text => setValue(text)}
        onChangeText={setValue}
        value={value}
        placeholder="Input name of doing..."
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Button title="Add" onPress={pressHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    width: "70%",
    padding: 10,
    borderStyle: "solid",
    borderBottomWidth: 2,

    borderColor: THEME.MAIN_COLOR,
  },
});
