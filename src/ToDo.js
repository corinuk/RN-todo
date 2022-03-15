import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "../colors";

function ToDo({ id, setToDos, saveToDos, toDos }) {
  const pressCheckBox = async (id) => {
    const newToDos = {
      ...toDos,
      [id]: {
        ...toDos[id],
        finished: !toDos[id].finished,
      },
    };
    setToDos(newToDos);
    saveToDos(newToDos);
  };
  const pressEditBtn = (id) => {
    const newToDos = {
      ...toDos,
      [id]: {
        ...toDos[id],
        editing: !toDos[id].editing,
      },
    };
    setToDos(newToDos);
  };
  const pressDelBtn = (id) => {
    Alert.alert("Delete ToDo", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const newToDos = { ...toDos };
          delete newToDos[id];
          setToDos(newToDos);
          await saveToDos(newToDos);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.toDo}>
      <View style={styles.toDoCheckBox}>
        {!toDos[id].finished ? (
          <Fontisto
            name="radio-btn-passive"
            size={24}
            color="black"
            onPress={() => pressCheckBox(id)}
          />
        ) : (
          <Fontisto
            name="radio-btn-active"
            size={24}
            color="black"
            onPress={() => pressCheckBox(id)}
          />
        )}
        <Text
          style={
            !toDos[id].finished ? styles.toDoText : styles.finishedToDoText
          }
        >
          {toDos[id].text}
        </Text>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          onPress={() => {
            pressEditBtn(id);
          }}
        >
          <Fontisto
            name="thermometer-alt"
            size={20}
            color={theme.grey}
            style={styles.editBtn}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pressDelBtn(id)}>
          <Fontisto
            name="trash"
            size={20}
            color={theme.grey}
            style={styles.delBtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoCheckBox: {
    paddingVertical: 20,
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  toDoText: {
    marginHorizontal: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  finishedToDoText: {
    marginHorizontal: 10,
    color: theme.grey,
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "line-through",
  },
  btns: {
    flexDirection: "row",
  },
  editBtn: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  delBtn: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default ToDo;
