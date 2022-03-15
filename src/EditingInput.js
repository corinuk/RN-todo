import { StyleSheet, TextInput, View } from "react-native";

function EditingInput({
  editingText,
  id,
  toDos,
  saveToDos,
  setEditingText,
  setToDos,
}) {
  const onEditing = (event) => setEditingText(event);
  const finishEditing = async (id) => {
    if (editingText === "") {
      const newToDos = {
        ...toDos,
        [id]: {
          ...toDos[id],
          editing: !toDos[id].editing,
        },
      };
      setToDos(newToDos);
      await saveToDos(newToDos);
    } else {
      const newToDos = {
        ...toDos,
        [id]: {
          ...toDos[id],
          text: editingText,
          editing: !toDos[id].editing,
        },
      };
      setToDos(newToDos);
      setEditingText("");
      await saveToDos(newToDos);
    }
  };
  return (
    <View style={styles.editingView}>
      <TextInput
        maxLength={14}
        onChangeText={onEditing}
        onBlur={() => finishEditing(id)}
        placeholder={toDos[id].text}
        returnKeyType="done"
        style={styles.editingInput}
        value={editingText}
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
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

export default EditingInput;
