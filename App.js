import React from "react";
import Main from "./Components/Main";
import States from "./Components/States";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StateContextProvider } from "./context";
import Faq from "./Components/Faq";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const Stack = createStackNavigator();
const client = new ApolloClient({
  uri: "https://agile-badlands-28744.herokuapp.com/",
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <StateContextProvider>
        <SafeAreaProvider style={{ backgroundColor: "rgba(0,0,0,0.95)" }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  title: "",
                  headerStyle: {
                    backgroundColor: "transparent",
                  },
                  headerTintColor: "#fff",
                }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={
                  (({ route }) => ({ title: route.params.state }),
                  {
                    headerBackImage: () => (
                      <FontAwesomeIcon
                        icon={faAngleDoubleLeft}
                        color="rgba(255,255,255,0.95)"
                        size={22}
                      />
                    ),
                    headerRightContainerStyle: { padding: 12 },
                    headerBackTitle: " ",
                    headerLeftContainerStyle: { padding: 12 },

                    headerStyle: {
                      backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                      fontWeight: "700",
                      fontVariant: ["small-caps"],
                    },

                    headerTintColor: "#fff",
                  })
                }
              />
              <Stack.Screen
                name="States"
                component={States}
                options={{
                  headerBackTitle: " ",
                  headerBackImage: () => (
                    <FontAwesomeIcon
                      icon={faAngleDoubleLeft}
                      color="rgba(255,255,255,0.95)"
                      size={22}
                    />
                  ),
                  headerLeftContainerStyle: { padding: 12 },
                  title: "Departments by State",
                  headerStyle: {
                    backgroundColor: "transparent",
                  },
                  headerTintColor: "#fff",
                }}
              />
              <Stack.Screen
                name="Faq"
                component={Faq}
                options={{
                  title: "FAQ",
                  headerBackTitle: " ",
                  headerBackImage: () => (
                    <FontAwesomeIcon
                      icon={faAngleDoubleLeft}
                      color="rgba(255,255,255,0.95)"
                      size={22}
                    />
                  ),
                  headerLeftContainerStyle: { padding: 12 },
                  headerTitleStyle: {
                    fontWeight: "700",
                    fontVariant: ["small-caps"],
                  },
                  headerStyle: {
                    backgroundColor: "transparent",
                    borderBottomColor: "white",
                  },
                  headerTintColor: "#fff",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </StateContextProvider>
    </ApolloProvider>
  );
};

export default App;
