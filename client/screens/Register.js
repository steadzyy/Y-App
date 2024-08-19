import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextInputExample from "../components/FormRegis";

export default function Register({navigation}) {
  return (
    <>
    <View style={styles.container}>
      <Text style={styles.text}>JOIN  <Image style={styles.tinyLogo} source={require('../assets/logo.png')}/> TODAY</Text>
      <TextInputExample />
      <Text style={{ color: "white", marginTop: 5 }}>
        Already have account?{" "}
        <Text style={{ color: "#2196F3", marginTop: 5 }} onPress={() => navigation.navigate('Login')}>
          Login
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
