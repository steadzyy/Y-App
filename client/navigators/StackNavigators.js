import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Register from "../screens/Register";
import Login from "../screens/Login";
import PostDetail from "../screens/PostDetail";
import CreatePost from "../screens/CreatePost";
import Search from "../screens/Search";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import { Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function StackNavigator() {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="BottomNav"
            component={BottomNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="‎ "
            component={CreatePost}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#000000",
              },
              headerRight: (el) => <SubmitButton {...el} />,
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 30, height: 30 }}
      source={require("../assets/logo.png")}
    />
  );
}

function BottomNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000",
          },
          headerTintColor: "#fff",
          headerTitle: (el) => <LogoTitle {...el} />,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Ionicons name="home-sharp" size={24} color="black" />;
            } else {
              return <Ionicons name="home-outline" size={24} color="black" />;
            }
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <FontAwesome name="search" size={24} color="black" />;
            } else {
              return <AntDesign name="search1" size={24} color="black" />;
            }
          },
        }}
      /> 
      
      <Tab.Screen
        name="Add Post"
        component={CreatePost}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <AntDesign name="pluscircle" size={24} color="#1DA1F2" />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <FontAwesome5 name="user-alt" size={24} color="black" />;
            } else {
              return <FontAwesome5 name="user" size={24} color="black" />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}
