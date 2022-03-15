import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./colors";

import Header from "./src/Header";
import ToDos from "./src/ToDos";

const STORAGE_KEY_TODOS = "@toDos";
const STORAGE_KEY_WORKING = "@working";

function App() {
  const [working, setWorking] = useState(true);
  const [_working, _setWorking] = useState("true");
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    loadToDos();
    loadAsyncStorageWorkingState();
  }, []);
  useEffect(() => {
    saveAsyncStorageWorkingState();
  }, [_working]);

  const loadToDos = async () => {
    try {
      const string = await AsyncStorage.getItem(STORAGE_KEY_TODOS);
      const parsedToDos = JSON.parse(string);
      setToDos(parsedToDos);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAsyncStorageWorkingState = async () => {
    try {
      const workingState = await AsyncStorage.getItem(STORAGE_KEY_WORKING);
      if (workingState === "true") {
        setWorking(true);
        _setWorking("true");
      } else if (workingState === "false") {
        setWorking(false);
        _setWorking("false");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const saveAsyncStorageWorkingState = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_WORKING, _working);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header
        _setWorking={_setWorking}
        setWorking={setWorking}
        working={working}
      />
      <ToDos
        editingText={editingText}
        setEditingText={setEditingText}
        setText={setText}
        setToDos={setToDos}
        STORAGE_KEY_TODOS={STORAGE_KEY_TODOS}
        text={text}
        toDos={toDos}
        working={working}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
});

export default App;
