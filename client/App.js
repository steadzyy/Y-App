// In App.js in a new project
import * as React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import client from "./config/apollo"
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from "./context/authContext"
import { ApolloProvider } from "@apollo/client";
import StackNavigator from "./navigators/StackNavigators";

const Stack = createNativeStackNavigator();


export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  //cek ada token apa gak

  React.useEffect(()=> {
    async function checkToken(){
      const result = await SecureStore.getItemAsync("access_token");
      // console.log(result, 'securestore');
      if(result) setIsSignedIn(true)
        setLoading(false)
    }
    checkToken();
  },[])

  if(loading) return <></>  

  return (
    <>
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{isSignedIn, setIsSignedIn}}>
      <NavigationContainer>
        <StatusBar />
      <StackNavigator/>
      </NavigationContainer>
      </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    margin: 8,
    width: 60,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DA1F2",
    borderColor: "#1DA1F2",
  },
});
