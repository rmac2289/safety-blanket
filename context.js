import React, { createContext, useState, useEffect } from "react";
import * as Location from "expo-location";

export const DataContext = createContext();

export const DataContextProvider = (props) => {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};

export const LoadingContext = createContext();

export const LoadingContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};

export const StateContext = createContext();

export const StateContextProvider = (props) => {
  const [pressedState, setPressedState] = useState("");

  return (
    <StateContext.Provider value={[pressedState, setPressedState]}>
      {props.children}
    </StateContext.Provider>
  );
};

export const UserLocContext = createContext();
export const UserLocContextProvider = (props) => {
  const [closestByLoc, setClosestByLoc] = useState([]);
  let city;
  let county;
  let userState;
  useEffect(() => {
    const getLoc = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Location Permission Denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      city = reverseGeo[0].city;
      county = reverseGeo[0].subregion;
      userState = reverseGeo[0].region;
      console.log("city", city);
      console.log("county", county);
      if (!reverseGeo[0].city) {
        console.log("Error");
      }
    };
    const fetchData = async () =>
      await fetch("https://agile-badlands-28744.herokuapp.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query($city: String!,$county: String!) {
              agencies_by_city(city:$city,county:$county) {
              agency
              phone
              street  
              city
              state
              zip
            }
          }`,
          variables: { city, county },
        }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((err) => setError(true));
    getLoc().then(() => fetchData(city, county));
  }, []);

  return (
    <UserLocContext.Provider value={[closestByLoc, setClosestByLoc]}>
      {props.children}
    </UserLocContext.Provider>
  );
};
