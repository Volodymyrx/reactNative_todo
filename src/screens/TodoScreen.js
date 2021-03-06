import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import { THEME } from "../theme";
import { AppCard } from "../ui/AppCard";
import { EditModal } from "../components/EditMoal";
import {AppTextBold} from "../ui/AppTextBold"
import {AppButton} from "../ui/AppButton"

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
        <AppTextBold style={styles.title}>
          {todo.title}
        </AppTextBold>
        <AppButton  onPress={() => setModal(true)} >
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>

        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={goBack} >
            <AntDesign name='back' size={20} color='#fff'  />
          </AppButton>
        </View>

        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          >
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
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
    // width: Dimensions.get('window').width / 3
    width: Dimensions.get('window').width > 350 ? 150 : 100
  },
  card: {
    marginBottom: 20,
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
});
