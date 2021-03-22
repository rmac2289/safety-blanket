import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const Error = () => {
  return (
    <View style={styles.errorBackground}>
      <View style={styles.error}>
        <Text style={styles.errorText}>
          Whoops, looks like something went wrong. Sorry about that! Make sure
          you have location enabled for Safety Blanket and try reopening the
          app.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 100,
  },
  errorText: {
    color: "rgba(255,255,255,0.9)",
    lineHeight: 25,
    fontSize: 18,
    height: 100,
    marginTop: 5,
    width: Dimensions.get("window").height / 2,
    fontWeight: "800",
  },
  errorBackground: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.95)",
    height: Dimensions.get("window").height / 2,
  },
});

export default Error;
