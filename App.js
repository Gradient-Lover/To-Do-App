import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  TouchableOpacity,
  Alert,
} from "react-native";
import ToDoItem from "./components/ToDoItem";
import ColorPicker from "./components/ColorPicker";

// Function to generate a ✨random✨ly colored task whenever a change is made
const randomColor = () => {
  let color;
  do {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  } while (color === "#000000"); // Keep generating colors until it finds a color that is not black!!
  return color;
};

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [colorPickerId, setColorPickerId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [toggleInfoButton, setToggleInfoButton] = useState("button");

  const handleChange = (text) => {
    setText(text);
  };

  const updateVisible = () => {
    setIsVisible(!isVisible);
  };

  const handleAdd = () => {
    if (text.trim()) {
      const newItem = {
        id: Math.random().toString(),
        text: text,
        color: randomColor(),
        createdAt: new Date().toLocaleString("en-GB", { timeZone: "GMT" }),
      };
      setItems([newItem, ...items]);
      setText("");
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Are you sure..?",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const newItems = items.filter((item) => item.id !== id);
            setItems(newItems);
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
          },
        },
      ]
    );
  };

  const handleShowColorPicker = (id) => {
    setColorPickerId(id);
  };

  const setItemColor = (id, color) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, color: color } : item
    );
    setItems(newItems);
    setColorPickerId(null);
  };

  const setAllColors = (color) => {
    const newItems = items.map((item) => ({ ...item, color: color }));
    setItems(newItems);
    setColorPickerId(null);
  };

  const handleSelect = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = () => {
    Alert.alert(
      "Are you sure..?",
      "Are you sure you want to delete the selected item(s)?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const newItems = items.filter(
              (item) => !selectedItems.includes(item.id)
            );
            setItems(newItems);
            setSelectedItems([]);
          },
        },
      ]
    );
  };

  const handleSelectAll = () => {
    const allItemIds = items.map((item) => item.id);
    setSelectedItems(allItemIds);
  };

  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  return (
    <View style={[styles.container, { backgroundColor: randomColor() }]}>
      <View>
        <Text style={[styles.title, { width: "100%" }]}>
          React Native To-Do List
        </Text>

        <TouchableOpacity
          style={styles.infoButtonTouchableOpacity}
          onPress={() => {
            if (toggleInfoButton === "button") {
              setToggleInfoButton("info");
            } else {
              setToggleInfoButton("button");
            }
          }}
        >
          <View style={styles.infoButton}>
            <Text style={styles.infoButtonText}>About tasks</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={text}
          onChangeText={handleChange}
        />
        <Button title="+" color="green" onPress={handleAdd} />
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <ToDoItem
            item={item}
            deleteItem={handleDelete}
            showColorPicker={handleShowColorPicker}
            onSelect={handleSelect}
            isSelected={selectedItems.includes(item.id)}
            toggleInfoButton={toggleInfoButton}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {colorPickerId && (
        <ColorPicker
          item={items.find((item) => item.id === colorPickerId)}
          setItemColor={setItemColor}
          setAllColors={setAllColors}
        />
      )}
      {selectedItems.length > 0 && (
        <View style={styles.selectedActions}>
          <Button title="Delete Selected" onPress={handleDeleteSelected} />
          <Button title="Select All" onPress={handleSelectAll} />
          <Button title="Deselect All" onPress={handleDeselectAll} />
        </View>
      )}
    </View>
  );
}

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
