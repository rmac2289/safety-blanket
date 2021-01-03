import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const NavButton = ({ buttonPress, icon, title }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.button}
      onPress={buttonPress}
    >
      <View style={styles.buttonLeftBox}>
        <FontAwesomeIcon
          color="rgba(255,255,255,0.95)"
          style={styles.icon}
          size={25}
          icon={icon}
        />
        <Text style={styles.faqText}>{title}</Text>
      </View>
      <FontAwesomeIcon
        color="rgba(255,255,255,0.95)"
        size={15}
        icon={faChevronRight}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  faqText: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 22,
    fontWeight: "600",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "rgb(40,75,220)",
    backgroundColor: "rgba(0,0,0,0.95)",
    marginLeft: 0,
    marginRight: "auto",
    height: 55,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonLeftBox: {
    display: "flex",
    flexDirection: "row",
  },
});
export default NavButton;
