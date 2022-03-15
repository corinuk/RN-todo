import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditingInput from "./EditingInput";
import ToDo from "./ToDo";

const finished = false;
const editing = false;

function ToDos({
  editingText,
  setEditingText,
  setText,
  setToDos,
  STORAGE_KEY_TODOS,
  text,
  toDos,
  working,
}) {
  const onTyping = (event) => setText(event);
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      ...toDos,
      [Date.now()]: { text, working, finished, editing },
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };
  const saveToDos = async (toSave) => {
    try {
      const string = JSON.stringify(toSave);
      await AsyncStorage.setItem(STORAGE_KEY_TODOS, string);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.toDos}>
      <TextInput
        maxLength={14}
        onChangeText={onTyping}
        onSubmitEditing={addToDo}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        returnKeyType="done"
        style={styles.input}
        value={text}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
      >
        {Object.keys(toDos)
          .sort((a, b) => {
            if ((toDos[a].finished === false, toDos[b].finished === true))
              return -1;
          })
          .sort((a, b) => {
            if ((toDos[a].finished === true, toDos[b].finished === true))
              return -1;
          })
          .map((key) =>
            toDos[key].working === working ? (
              toDos[key].editing === true ? (
                <EditingInput
                  editingText={editingText}
                  id={key}
                  key={key}
                  toDos={toDos}
                  saveToDos={saveToDos}
                  setEditingText={setEditingText}
                  setToDos={setToDos}
                />
              ) : (
                <ToDo
                  id={key}
                  key={key}
                  setToDos={setToDos}
                  saveToDos={saveToDos}
                  toDos={toDos}
                />
              )
            ) : null
          )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  toDos: {
    flex: 15,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    fontSize: 20,
  },
  editingView: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editingInput: {
    fontSize: 20,
    width: "100%",
  },
});

export default ToDos;
