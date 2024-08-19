import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

const SEARCH = gql`
  query UserByUsername($user: searchUser) {
    userByUsername(user: $user) {
      _id
      name
      username
    }
  }
`;
const FOLLOW_USER = gql`
  mutation FollowUser($followingId: String) {
    followUser(followingId: $followingId)
  }
`;

const Search = () => {
  const [text, setText] = useState("");
  const [followedUsers, setFollowedUsers] = useState({});

  const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH, {
    fetchPolicy: "network-only",
    onError: (err) => console.error(err),
  });

  const [followUser] = useMutation(FOLLOW_USER);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (text) {
        searchUsers({ variables: { user: { username: text, name: text } } });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [text, searchUsers]);

  const handleChangeText = (text) => {
    setText(text);
  };

  const handleFollowToggle = async (userId) => {
    try {
      await followUser({ variables: { followingId: userId } });
      Alert.alert('Success Follow')
    } catch (error) {
      console.error("Error following user:", error.message);
      Alert.alert(error.message)
    }
  };

  const renderUser = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.username}>{item.username}</Text>
      <TouchableOpacity
        style={[
          styles.followButton,
          followedUsers[item._id] ? styles.followedButton : {},
        ]}
        onPress={() => handleFollowToggle(item._id)}
        disabled={followedUsers[item._id]}
      >
        <Text style={styles.followButtonText}>
          {followedUsers[item._id] ? "Followed" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </SafeAreaView>
    );

  const users = data?.userByUsername || [];

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleChangeText}
        placeholder="Search by name or username..."
        placeholderTextColor="white"
        value={text}
        autoCapitalize="none"
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={renderUser}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    flexGrow: 1,
    width: "100%",
    padding: 15,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    alignItems: "center",
    backgroundColor: "#222",
    width: "100%",
  },
  username: {
    fontSize: 18,
    color: "white",
  },
  followButton: {
    borderWidth: 2,
    margin: 8,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
  },
  followedButton: {
    backgroundColor: "#grey",
    borderColor: "#grey",
  },
  followButtonText: {
    color: "#fff",
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    padding: 10,
  },
  errorText: {
    color: "white",
  },
});

export default Search;

// import { gql, useQuery } from "@apollo/client";
// import React from "react";
// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const SEARCH = gql`
//   query UserByUsername($user: searchUser) {
//     userByUsername(user: $user) {
//       _id
//       name
//       username
//       email
//       password
//       followingDetail {
//         _id
//         name
//         username
//       }
//       followerDetail {
//         _id
//         name
//         username
//       }
//     }
//   }
// `;

// const Search = () => {
//   const [text, onChangeText] = React.useState("");
//   const [searchByName, setSearchByName] = React.useState("");
//   const [searchByUsername, setSearchByUsername] = React.useState("");
//   const { data, loading, error, refetch } = useQuery(SEARCH, {
//     variables: {
//       user: {
//         name: searchByName,
//         username: searchByUsername,
//       },
//     },
//   });
//   console.log(data, 'DATAA SEARCH');
//   const handleSearch = (text, type) => {
//     try {
//       if (type === "name") {
//         setSearchByName(text);
//         execute();
//       }
//       // console.log(text, "textttt");
//     } catch (error) {
//       console.log(error);
//       Alert.alert(error.message);
//     }
//   };

//   const execute = () => {
//     refetch()
//   }

//   const handleFollowToggle = async (userId) => {
//     try {
//         // Assume `currentUserId` is obtained from context or props
//         const currentUserId = 'currentUserId'; // Replace with actual current user ID

//         console.log(userId, "<<<USERID");
//         const result = await followUser({
//             variables: {
//                 id: userId,
//             },
//         });
//         setFollowedUsers(prev => ({ ...prev, [userId]: true }));

//         console.log('Follow result:', result.data.followUser);

//         // Update the local state or refetch data if needed
//         Alert.alert('Success', `Followed user ${userId}`);
//     } catch (error) {
//         console.log('Error following user:', error.message);
//         Alert.alert('Error', `Failed to follow user ${userId}`);
//     }
// };

//   const users = data?.userByUsername || [];
//   // console.log(users, "User Search<<<<<<<<<");

//   const renderUser = ({ item }) => (
//     <View style={styles.userItem}>
//       <Text style={styles.username}>{item.username}</Text>
//       <TouchableOpacity
//         style={[
//           styles.followButton,
//           followedUsers[item._id] ? styles.followedButton : {},
//         ]}
//         onPress={() => {
//           if (!followedUsers[item._id]) {
//             handleFollowToggle(item._id);
//           }
//         }}
//         disabled={followedUsers[item._id]}
//       >
//         <Text style={styles.followButtonText}>
//           {followedUsers[item._id] ? "Followed" : "Follow"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           onChangeText={(text) => handleSearch(text, "name")}
//           placeholder="Search..."
//           placeholderTextColor="white"
//           value={searchByName}
//           autoCapitalize= "none"
//         />

//         <FlatList
//           data={users}
//           keyExtractor={(item) => item._id}
//           renderItem={renderUser}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000000",
//     alignItems: "center",
//     justifyContent: "cent",
//   },
//   userItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     alignItems: 'center',
//     backgroundColor: 'red'
// },
//   username: {
//     fontSize: 18,
//     color: "white"
// },
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
//   input: {
//     width: 300,
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     borderColor: "white",
//     color: "white",
//     padding: 10,
//   },
// });

// export default Search;
