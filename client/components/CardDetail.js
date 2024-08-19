import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const GET_POST_BYID = gql`
  query PostsById($id: ID) {
    postsById(_id: $id) {
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
const COMMENT = gql`
  mutation AddComment($content: String, $postId: String) {
    addComment(content: $content, postId: $postId)
  }
`;
export default function CardsDetail() {
  // console.log(route.params, '<<< Params');
  const route = useRoute();
  const navigation = useNavigation();
  const { _id } = route.params;
  // console.log("Route params:", route.params);
  const { data, loading, error, refetch } = useQuery(GET_POST_BYID, {
    variables: {
      id: _id,
    },
  });
  // console.log(data, 'DATA DETAIL<<<<<'); 
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
        />
        <Text style={styles.name}>{data?.postsById?.Author?.name}</Text>
        <Text style={styles.username}>
          @{data?.postsById?.Author?.username}
        </Text>
        <Text style={styles.time}>·14.20</Text>
      </View>
      <Text style={styles.text}>{data?.postsById?.content}</Text>
      <Image
        style={styles.imagePost}
        source={{ uri: data?.postsById?.imgUrl }}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("PostDetail")}
        >
          <EvilIcons name="comment" size={24} color="#808080" />
          {/* <Text style={[styles.actionText, { color: liked ? "red" : "grey" }]}>{likes}</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
          <EvilIcons name="heart" size={24} color="#808080" />
          {/* <Text style={styles.actionText}>{comments}</Text> */}
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
