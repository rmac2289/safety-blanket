import * as React from "react";
import Main from "./Components/Main";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{backgroundColor: "black"}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} 
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: "black",
            height: 0,
          },
        }}/>
        <Stack.Screen name="Search" component={Search}
        options={{
          title: 'All Departments',
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: '#fff',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
