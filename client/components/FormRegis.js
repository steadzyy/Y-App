import { gql, useMutation } from "@apollo/client";
import React from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const REGISTER = gql`
  mutation Register($user: NewUser) {
    register(user: $user) {
      _id
      name
      username
      email
      password
      followingDetail {
        _id
        name
        username
      }
      followerDetail {
        _id
        name
        username
      }
    }
  }
`;

const TextInputExample = () => {
  const navigation = useNavigation()
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [doRegister, { loading }] = useMutation(REGISTER);
  console.log(doRegister);

  const handleRegister = async () => {
    // console.log("masuk sini");
    try {
      const result = await doRegister({
        variables: {
          user: {
            email: email,
            name: name,
            username: username,
            password: password,
          },
        },
      });
      console.log(result, "<<<<");
      Alert.alert("Register Success");
      navigation.navigate('Login')
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
        placeholderTextColor="#C0C0C0"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
        placeholderTextColor="#C0C0C0"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="#C0C0C0"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#C0C0C0"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ fontWeight: "bold" }}>SIGN UP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    borderColor: "white",
    color: "white",
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
});

export default TextInputExample;
