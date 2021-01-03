import React from "react";
import Main from "./Components/Main";
import States from "./Components/States";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DataContextProvider,
  LoadingContextProvider,
  StateContextProvider,
} from "./context";
import Faq from "./Components/Faq";

const Stack = createStackNavigator();

const App = () => {
  return (
    <StateContextProvider>
      <LoadingContextProvider>
        <DataContextProvider>
          <SafeAreaProvider style={{ backgroundColor: "rgba(0,0,0,0.95)" }}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Main"
                  component={Main}
                  options={{
                    title: "Home",
                    headerStyle: {
                      backgroundColor: "rgba(0,0,0,0.95)",
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
                      headerStyle: {
                        backgroundColor: "rgba(0,0,0,0.95)",
                      },
                      headerTintColor: "#fff",
                    })
                  }
                />
                <Stack.Screen
                  name="States"
                  component={States}
                  options={{
                    title: "Departments by State",
                    headerStyle: {
                      backgroundColor: "rgba(0,0,0,0.95)",
                    },
                    headerTintColor: "#fff",
                  }}
                />
                <Stack.Screen
                  name="Faq"
                  component={Faq}
                  options={{
                    title: "911 FAQ",
                    headerStyle: {
                      backgroundColor: "rgba(0,0,0,0.95)",
                    },
                    headerTintColor: "#fff",
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </DataContextProvider>
      </LoadingContextProvider>
    </StateContextProvider>
  );
};

export default App;
