import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const GET_PROFILE = gql`
 query UserById($id: ID) {
  userById(_id: $id) {
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

const ProfileScreen = () => {
    const { setIsSignedIn, userId } = useContext(AuthContext);
    const navigation = useNavigation();

    const { data, loading, error, refetch } = useQuery(GET_PROFILE, {
      // variables: { id: userId },
      fetchPolicy: "no-cache",
    });
    // console.log(data, 'DATA PROFILE SCREEN');
    useEffect(() => {

      refetch();
    }, [refetch]);
 
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
      console.error("Error fetching profile:", error.message);
      Alert.alert("Error", "Failed to fetch profile");
      return <Text>Error: {error.message}</Text>;
    }

    const user = data?.userById || {};

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("access_token");
    setIsSignedIn(false);
  };

  return (
    <View style={styles.container}>
      <Image
          style={styles.tinyLogo}
          source={{
            uri: "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg",
          }}
        />
      <Text style={styles.name}>{data?.userById?.name}</Text>
      <Text style={styles.username}>@{data?.userById?.username}</Text>
      <View style={styles.statsContainer}>
        <TouchableOpacity style={styles.statItem} onPress={() => {}}>
          <Text style={styles.statNumber}>{data?.userById?.followerDetail.length}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem} onPress={() => {}}>
          <Text style={styles.statNumber}>{data?.userById?.followingDetail.length}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
        <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>
          Logout
        </Text>

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    padding: 20,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    borderColor: "black",
    borderRadius: 100,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  username: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 20,
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

export default ProfileScreen;
