import React from "react";
import { View, StyleSheet } from "react-native";

export const AppCard = (props) => (
  <View style={ {...styles.default, ...props.style} }>{props.children}</View>
);

const styles = StyleSheet.create({
  default: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center',
    padding: 20,
    // borderWidth: 2,
    // borderColor: "green",
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 8, //android

    backgroundColor: '#efefef',
  },
});
