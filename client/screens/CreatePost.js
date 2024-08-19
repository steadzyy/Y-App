import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormAdd from "../components/FormAdd";

export default function CreatePost({navigation}) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>What Is Happening?</Text>
        <FormAdd navigation={navigation}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    position: "relative",
    color: "white",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  button: {
    borderWidth: 2,
    margin: 8,
    width: 250,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
  },
});
