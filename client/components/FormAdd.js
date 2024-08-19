import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ADD_POST = gql`
  mutation AddPost($content: String, $tags: [String], $imgUrl: String) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
      _id
      content
      tags
      imgUrl
      AuthorId
      Author {
        name
        username
        email
        _id
      }
      Comment {
        content
        username
        createdAt
        updatedAt
      }
      Like {
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export default function FormAdd({ navigation }) {
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [createPost, { loading }] = useMutation(ADD_POST, {
    onCompleted: () => {
      navigation.navigate("Home");
      console.log("MASOKKKK");
      // Alert.alert("Success Create Post");
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  });

  const addPost = async () => {
    try {
      await createPost({
        variables: {
          content: content,
          tags: tags.split(","),
          imgUrl: imgUrl,
        },
      });
      setContent("");
      setTags("");
      setImgUrl("");
      Alert.alert("Success Create Post");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setContent}
        value={content}
        placeholder="Input your content here"
        placeholderTextColor="#C0C0C0"
      />

      <TextInput
        style={styles.input}
        onChangeText={setTags}
        value={tags}
        placeholder="Input your tags here"
        placeholderTextColor="#C0C0C0"
      />

      <TextInput
        style={styles.input}
        onChangeText={setImgUrl}
        value={imgUrl}
        placeholder="Insert your ImageUrl here"
        placeholderTextColor="#C0C0C0"
      />

      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 15 }}>
          SUBMIT
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
  },
});

// import { gql, useMutation } from "@apollo/client";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const ADD_POST = gql`
//   mutation AddPost($content: String, $tags: [String], $imgUrl: String) {
//     addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
//       _id
//       content
//       tags
//       imgUrl
//       AuthorId
//       Author {
//         name
//         username
//         email
//         _id
//       }
//       Comment {
//         content
//         username
//         createdAt
//         updatedAt
//       }
//       Like {
//         username
//         createdAt
//         updatedAt
//       }
//     }
//   }
// `;

// export default function FormAdd() {
//   const navigation = useNavigation();
//   const [content, setContent] = React.useState("");
//   const [tags, setTags] = React.useState("");
//   const [imgUrl, setImgUrl] = React.useState("");
//   const [createPost, { loading }] = useMutation(ADD_POST);

//   const addPost = async () => {
//     try {
//       const result = await createPost({
//         variables: {
//           content: content,
//           tags: tags,
//           imgUrl: imgUrl,
//         },
//       });
//       setContent("")
//       setTags("")
//       setImgUrl("")
//       // console.log(result, "<<< ADD POST");
//       navigation.navigate('Home')
//       Alert.alert("Success Create Post");
//     } catch (error) {
//       console.log(error);
//       Alert.alert(error.message);
//     }
//   };

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={setContent}
//         value={content}
//         placeholder="Input your content here"
//         placeholderTextColor="#C0C0C0"
//       />

//       <TextInput
//         style={styles.input}
//         onChangeText={setTags}
//         value={tags}
//         placeholder="Input your tags here"
//         placeholderTextColor="#C0C0C0"
//       />

//       <TextInput
//         style={styles.input}
//         onChangeText={setImgUrl}
//         value={imgUrl}
//         placeholder="Insert your ImageUrl here"
//         placeholderTextColor="#C0C0C0"
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={addPost}
//       >
//         <Text style={{ fontWeight: "bold", color: "white", fontSize: "15" }}>
//           SUBMIT
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

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
//     backgroundColor: "#1DA1F2",
//     borderColor: "#1DA1F2",
//   },
// });
