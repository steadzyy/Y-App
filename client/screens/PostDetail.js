import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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

const LIKE = gql`
  mutation AddLike($postId: String) {
    addLike(postId: $postId)
  }
`;


export default function PostDetail() {
  const [comment, setComment] = useState("");
  const [addComment] = useMutation(COMMENT);
  const route = useRoute();
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false); 
  const [dataLike] = useMutation(LIKE);
  const { _id } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_POST_BYID, {
    variables: {
      id: _id,
    },
  });
// console.log(data, 'Data<<<<<<<<<');

  const commentPost = async () => {
    try {
      await addComment({
        variables: {
          content: comment,
          postId: _id,
        },
      });
      refetch()
      setComment("")
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  const likePost = async () => {
    try {
      await dataLike({
        variables: {
          postId: _id,
        },
      });
      refetch()
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

  const renderComment = ({ item }) => (
    // console.log();
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Image
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>@{item.username}</Text>
          <Text style={styles.commentText}>{item.content}</Text>
        </View>
      </View>
    </View>
  );

  const commentsCount = data?.postsById?.Comment?.length || 0;
  const likesCount = data?.postsById?.Like?.length || 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
      <View style={styles.card}>
      <View style={styles.header}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
        />
        <Text style={styles.name}>{data?.postsById?.Author?.name}</Text>
        <Text style={styles.username1}>
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
          onPress={() => navigation.navigate("PostDetail", { _id })}
        >
          <FontAwesome name="comment-o" size={24} color="#808080" />
          <Text style={styles.footerText}>{commentsCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={likePost}>
        <Entypo name="heart" size={24} color={liked ? "red" : "#808080"}  />
        <Text style={styles.footerText}>{likesCount}</Text>
        </TouchableOpacity>
      </View>
    </View>

        <View style={styles.content}>
          <FlatList
            data={data?.postsById?.Comment}
            renderItem={renderComment}
            key={(item) => item.id}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          placeholderTextColor="#888"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.button} onPress={commentPost}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  username1: {
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
  footerText: {
    color: "white",
    marginLeft: 5, 
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomColor: "#555",
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    color: "white",
    fontSize: 16,
  },
  commentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#1DA1F2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
