import * as React from "react";
import { Text, View } from 'react-native';
import Main from "./Components/Main";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "./Components/Search";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'https://agile-badlands-28744.herokuapp.com/',
  cache: new InMemoryCache()
});
client.query({
  query: gql`
    query getAgencies {
      agencies {
        agency
        phone
      }
    }
  `
}).then(result => console.log(result))
const App = () => {
  
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default App;
