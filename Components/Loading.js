import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const Loading = ({ message, initialLoad }) => {
  return (
    <View style={styles.backgroundLoading}>
      <View style={styles.loading}>
        <LottieView
          style={{
            height: 150,
            width: 150,
          }}
          source={
            initialLoad
              ? require("../animation.json")
              : require("../loading.json")
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
    marginBottom: 100,
  },
  loadingText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    height: 20,
    marginTop: 5,
    fontWeight: "800",
  },
  backgroundLoading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height,
  },
});

export default Loading;
