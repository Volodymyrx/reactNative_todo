import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { THEME } from "../theme";
import { AppCard } from "../ui/AppCard";
import { EditModal } from "../components/EditMoal";

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);
 
const saveHandler = title =>{
  onSave(todo.id, title)
  setModal(false)
}

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        todo={todo}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <Text style={styles.title}>
          title todo: {todo.title}, id: {todo.id}
        </Text>
        <Button title="Edit" onPress={() => setModal(true)} />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.buttons}>
          <Button title="Back" color={THEME.GREY_COLOR} onPress={goBack} />
        </View>

        <View style={styles.buttons}>
          <Button
            title="Delete"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
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
    width: "40%",
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 26,
  },
});
