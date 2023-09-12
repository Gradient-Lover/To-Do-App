import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";

// Function to generate a ✨random✨ly colored task whenever a change is made
const randomColor = () => {
  let color;
  do {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  } while (color === "#000000"); // Keep generating colors until it finds a color that is not black!!
  return color;
};

const ColorPicker = ({ item, setItemColor, setAllColors }) => {
  // An array of colours for the circles 💖🧡💛💚💙💜💗
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

const ToDoItem = ({
  item,
  deleteItem,
  showColorPicker,
  onSelect,
  isSelected,
  toggleInfo,
  infoVisible,
}) => {
  const handlePress = () => {
    onSelect(item.id);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          styles.item,
          { backgroundColor: isSelected ? "lightgray" : item.color },
        ]}
      >
        <Text style={[styles.itemText, { width: "70%" }]}>{item.text}</Text>
        <View
          style={{
            display: `${infoVisible ? "flex" : "none"}`,
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
        {/* Display the info section */}
        {infoVisible && (
          <View style={styles.info}>
            <Text style={styles.infoText}>
              Task created at: {item.createdAt}
            </Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function App() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [colorPickerId, setColorPickerId] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [infoVisible, setInfoVisible] = useState({});
  const [isVisible, setIsVisible] = useState(false);

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

  const toggleInfo = (itemId) => {
    setInfoVisible((prevInfoVisible) => ({
      ...prevInfoVisible,
      [itemId]: !prevInfoVisible[itemId],
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: randomColor() }]}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={[styles.title, { width: "80%" }]}>
          React Native To-Do List
        </Text>
        {/* Add the info button */}
        <TouchableOpacity onPress={updateVisible}>
          <View style={styles.infoButton}>
            <Text style={styles.infoButtonText}>?</Text>
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
            toggleInfo={toggleInfo}
            infoVisible={infoVisible[item.id] || false}
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
    top: 15,
    right: -50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#25b7d3",
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
});
