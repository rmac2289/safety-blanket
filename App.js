import React from "react";
import Main from "./Components/Main";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DataContextProvider, LoadingContextProvider } from "./context";
import Faq from "./Components/Faq";

const Stack = createStackNavigator();

const App = () => {
  return (
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
                    height: 0,
                  },
                }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  title: "All Departments",
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
  );
};

export default App;
