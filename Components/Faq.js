import React from "react";
import { ScrollView, Text, StyleSheet, Dimensions, View } from "react-native";
import { faq } from "../services";

const Faq = () => {
  const faqList = faq.map((v) => {
    return (
      <View key={v.question} style={styles.qaBox}>
        <Text style={styles.question}>{v.question}</Text>
        <Text style={styles.answer}>{v.answer}</Text>
      </View>
    );
  });
  return (
    <ScrollView style={styles.container}>
      <View style={styles.qaContainer}>{faqList}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.95)",
    padding: 10,
  },
  qaContainer: {
    width: "97%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 50,
  },
  qaBox: {
    padding: 10,
    borderWidth: 2,
    borderColor: "rgb(40,75,220)",
    margin: 6,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.95)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  question: {
    color: "rgb(40,75,220)",
    fontSize: 22,
    fontWeight: "600",
  },
  answer: {
    color: "rgba(0,0,0,0.9)",
    fontSize: 18,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: 20,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  headerText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 24,
  },
});

export default Faq;
