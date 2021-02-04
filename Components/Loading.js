import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const Loading = ({ initialLoad }) => {
  return (
    <View
      style={{
        height: initialLoad ? 250 : Dimensions.get("window").height,
      }}
    >
      <View
        style={{
          marginTop: 25,
          marginBottom: initialLoad ? 0 : 150,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          style={{
            height: initialLoad ? 150 : Dimensions.get("window").height / 2,
            width: initialLoad ? 150 : Dimensions.get("window").width / 2,
          }}
          source={
            initialLoad
              ? require("../assets/gpsAnim.json")
              : require("../assets/loadingAnim.json")
          }
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingBackground: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.95)",
  },
});

export default Loading;
