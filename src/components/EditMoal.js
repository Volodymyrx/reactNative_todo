import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Modal, Alert } from "react-native";
import { THEME } from "../theme";

export const EditModal = ({ visible, onCancel, todo, value, onSave }) => {
  const [title, setTitle] = useState(value);
const saveHandler=()=>{
    if (title.trim().length < 3){
        Alert.alert(
            "Todo is too short.",
            null,
            [
                "Ok",
            ]
        )
    } else {
        onSave(title)
    }
}

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder="Input name of Todo"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          value={title}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <Button
            title="Cancel"
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title="Save" onPress={saveHandler} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: "80%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    // alignContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});
