import { Image, StyleSheet, Text, View } from "react-native";
import FormLogin from "../components/FormLogin";

export default function Login({ navigation }) {
 
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>
          LOGIN TO{" "}
          <Image
            style={styles.tinyLogo}
            source={require("../assets/logo.png")}
          />
        </Text>
        <FormLogin />
        <Text style={{ color: "white", marginTop: 5 }}>
          Dont have account?{" "}
          <Text
            style={{ color: "#2196F3", marginTop: 5 }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
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
    backgroundColor: "white",
    borderColor: "white",
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderColor: "black",
  },
});
