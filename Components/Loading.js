import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";

const Loading = ({ message, initialLoad }) => {
  return (
    <View style={styles.loadingBackground}>
      <View style={styles.loading}>
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

        <Text style={styles.loadingText}>
          {message}
          {"..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 150,
  },
  loadingText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    height: 25,
    marginTop: 5,
    fontWeight: "800",
  },
  loadingBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height,
  },
});

export default Loading;
