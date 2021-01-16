import React from "react";
import Main from "./Components/Main";
import States from "./Components/States";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import "react-native-gesture-handler";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  DataContextProvider,
  LoadingContextProvider,
  StateContextProvider,
  UserLocContextProvider,
} from "./context";
import Faq from "./Components/Faq";

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserLocContextProvider>
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
          </DataContextProvider>
        </LoadingContextProvider>
      </StateContextProvider>
    </UserLocContextProvider>
  );
};

export default App;
