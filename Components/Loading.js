import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

const Loading = ({ message }) => {
  return (
    <View style={styles.backgroundLoading}>
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          {message}
          {"..."}
        </Text>
        <ActivityIndicator style={styles.spinner} size="large" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "absolute",
    bottom: 75,
  },
  loading: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  loadingText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
  },
  backgroundLoading: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: Dimensions.get("window").height,
  },
});

export default Loading;
