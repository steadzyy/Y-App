import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

const LIKE = gql`
  mutation AddLike($postId: String) {
    addLike(postId: $postId)
  }
`;

export default function Cards({
  _id,
  name,
  username,
  time,
  tweet,
  image,
  likes,  
  comments,
}) {
  const route = useRoute();
  // console.log(route, "<<<<");
  const [liked, setLiked] = useState(false);
  const navigation = useNavigation();
  const [dataLike] = useMutation(LIKE);

  const likePost = async () => {
    try {
      await dataLike({
        variables: {
          postId: _id,
        },
      });
      setLiked(true)
      Alert.alert('success like post')
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const commentsCount = comments?.length || 0;
  const likesCount = likes?.length || 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@{username}</Text>
        <Text style={styles.time}>·{time}</Text>
      </View>
      <Text style={styles.text}>{tweet}</Text>
      <Image style={styles.imagePost} source={{ uri: image }} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("PostDetail", { _id })}
        >
          <FontAwesome name="comment-o" size={24} color="#808080" />
          <Text style={styles.footerText}>{commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Entypo name="heart" size={24} color={liked ? "red" : "#808080"} />
          <Text style={styles.footerText}>{likesCount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "black",
    padding: 8,
    marginVertical: 0,
    marginHorizontal: 16,
    borderRadius: 0,
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: 1,
    borderTopColor: "#808080",
    borderBottomColor: "#808080",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
  username: {
    marginRight: 0,
    marginLeft: 3,
    marginRight: 2,
    color: "white",
    color: "#C0C0C0",
  },
  time: {
    marginRight: 5,
    marginLeft: 0,
    color: "#C0C0C0",
  },
  text: {
    marginBottom: 10,
    color: "#555",
    marginLeft: 50,
    color: "white",
  },
  footerText: {
    color: "white",
    marginLeft: 5, 
    fontSize: 16,
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderColor: "black",
    borderRadius: 100,
  },
  imagePost: {
    width: 300,
    height: 300,
    borderColor: "black",
    marginLeft: 50,
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginLeft: 10,
    gap: 50,
  },
});
