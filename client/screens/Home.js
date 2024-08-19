
import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Cards from "../components/Cards";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { gql, useMutation, useQuery } from "@apollo/client";

const GET_POST = gql`
  query Posts {
    posts {
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

const Home = () => {
  const { setIsSignedIn } = useContext(AuthContext);
  const { data, loading, error, refetch } = useQuery(GET_POST);
  // console.log(data, "<<<<<< DATAAA");

  const renderData = ({ item }) => (
    // console.log("Post Item:", JSON.stringify(item, null, 2)),
    
    <Cards
      _id={item._id}
      name={item.Author.name}
      username={item.Author.username}
      time={item.postingTime}
      tweet={item.content}
      image={item.imgUrl}
      likes={(item.Like || []).map((like) => like.username)}
      comments={(item.Comment || []).map((comment) => ({
        username: comment.username,
        text: comment.content,
        time: comment.createdAt,
   
      }))}
    />

  );

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text>{error.message}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.posts || []}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderData}
        onRefresh={refetch} 
        refreshing={loading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    width: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
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
});

export default Home;
