import React from "react";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export const ToDoItem = ({
  item,
  deleteItem,
  showColorPicker,
  isSelected,
  toggleInfoButton,
  handleSelect,
}) => {
  return (
    <TouchableWithoutFeedback
      onLongPress={() => {
        handleSelect(item.id);
      }}
    >
      <View
        style={[
          styles.item,
          { backgroundColor: isSelected ? "lightgray" : item.color },
        ]}
      >
        <Text style={[styles.itemText, { width: "70%" }]}>{item.text}</Text>
        {toggleInfoButton == "button" ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "30%",
              justifyContent: "center",
            }}
          >
            <Button
              title="🎨"
              color="black"
              onPress={() => showColorPicker(item.id)}
              style={{ width: "50%" }}
            />
            <Button
              title="❌"
              color="white"
              onPress={() => deleteItem(item.id)}
              style={{ width: "50%" }}
            />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "30%",
              justifyContent: "center",
            }}
          >
            <Text>information</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    color: "white",
    backgroundColor: "black",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 18,
    color: "black",
  },
  colorPicker: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 10,
  },
  colorCircles: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  tickMark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  colorButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  selectedActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  infoButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    color: "white",
    fontSize: 24,
  },
  info: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "white",
    padding: 10,
    zIndex: 1,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  infoButtonTouchableOpacity: {
    backgroundColor: "black",
    textAlign: "center",
  },
});

export default ToDoItem;
