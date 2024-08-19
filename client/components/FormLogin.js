import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const LOGIN = gql`
  mutation Login($login: loginUser) {
    login(login: $login)
  }
`;

const FormLogin = () => {
  const navigation = useNavigation()
  const { setIsSignedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [doLogin, { loading }] = useMutation(LOGIN);
  console.log(doLogin);

  const handleLogin = async () => {
    // console.log("masuk sini");
    try {
      console.log(username, "test username");
      const result = await doLogin({
        variables: {
          login: {
            username: username,
            password: password,
          },
        },
      });
      console.log(result.data?.login, "<<<<Token");

      const access_Token = result.data?.login

      if (typeof access_Token === 'string') {
        await SecureStore.setItemAsync("access_token", access_Token);
        setIsSignedIn(true);
      } else {
        console.error("Access token is not a string:", access_Token);
      }
      Alert.alert('Login Success')
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView>
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
        onChangeText={setpassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#C0C0C0"
         autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={{ fontWeight: "bold" }}>SIGN IN</Text>
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

export default FormLogin;


// import { gql, useMutation } from "@apollo/client";
// import React, { useContext, useState } from "react";
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { AuthContext } from "../context/authContext";
// import * as SecureStore from "expo-secure-store";

// const LOGIN = gql`
//   mutation Login($login: loginUser) {
//     login(login: $login)
//   }
// `;

// const FormLogin = () => {
//   const { setIsSignedIn } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setpassword] = useState("");
//   const [doLogin, { loading }] = useMutation(LOGIN);
//   console.log(doLogin);

//   const handleLogin = async () => {
//     console.log("masuk sini");
//     try {
//       console.log(username, "test username");
//       const result = await doLogin({
//         variables: {
//           login: {
//             username: username,
//             password: password,
//           },
//         },
//       });
//       console.log(result, "<<<<");
//       await SecureStore.setItemAsync(
//         "access_token",
//         result.data?.login?.access_token
//       );
//       setIsSignedIn(true);
//     } catch (error) {
//       console.log(error);
//       Alert.alert(error.message);
//     }
//   };

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={setUsername}
//         value={username}
//         placeholder="Username"
//         placeholderTextColor="#C0C0C0"
//       />

//       <TextInput
//         style={styles.input}
//         onChangeText={setpassword}
//         value={password}
//         secureTextEntry={true}
//         placeholder="Password"
//         placeholderTextColor="#C0C0C0"
//       />

//       <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
//         <Text style={{ fontWeight: "bold" }}>SIGN IN</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     width: 250,
//     height: 40,
//     margin: 5,
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 3,
//     borderColor: "white",
//     color: "white",
//   },
//   button: {
//     borderWidth: 2,
//     margin: 8,
//     width: 250,
//     height: 40,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//     borderColor: "white",
//   },
// });

// export default FormLogin;
