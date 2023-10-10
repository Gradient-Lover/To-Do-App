import React from "react";
import { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";

const ColorPicker = ({ item, setItemColor, setAllColors }) => {
  // An array of colours for the circles
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "<View></View>",
    "lightsalmon",
    "palegoldenrod",
    "lightyellow",
    "lightgreen",
    "lightblue",
    "lavender",
    "lightpink",
  ];
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSet = () => {
    if (selectedColor) {
      setItemColor(item.id, selectedColor);
      setSelectedColor(null);
    }
  };

  const handleSetAll = () => {
    if (selectedColor) {
      setAllColors(selectedColor);
      setSelectedColor(null);
    }
  };

  return (
    <View style={styles.colorPicker}>
      <View style={styles.colorCircles}>
        {colors.map((color) => (
          <TouchableWithoutFeedback
            key={color}
            onPress={() => handleColorSelect(color)}
          >
            <View style={[styles.colorCircle, { backgroundColor: color }]}>
              {selectedColor === color && (
                <Text style={styles.tickMark}>✓</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={styles.colorButtons}>
        <Button title="Set for All" onPress={handleSetAll} />
        <Button title="Set" onPress={handleSet} />
      </View>
    </View>
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

export default ColorPicker;
