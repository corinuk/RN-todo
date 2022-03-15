import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../colors";

function Header({ working, setWorking, _setWorking }) {
  const pressWork = async () => {
    setWorking(true);
    _setWorking("true");
  };
  const pressTravel = async () => {
    setWorking(false);
    _setWorking("false");
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={pressWork}>
        <Text
          style={{
            ...styles.btnText,
            color: working ? "white" : theme.grey,
          }}
        >
          Work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pressTravel}>
        <Text
          style={{
            ...styles.btnText,
            color: !working ? "white" : theme.grey,
          }}
        >
          Travel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
});

export default Header;
