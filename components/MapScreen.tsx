import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Map from "./Map";

const MapScreen = () => {
  return (
    <View>
      <Map />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonText: {
    fontSize: 28,
    lineHeight: 28,
  },
});
