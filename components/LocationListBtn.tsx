import { TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "@react-navigation/elements";
import { router } from "expo-router";

const LocationListBtn = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#14b8a6",
        borderRadius: 28,
        paddingHorizontal: 18,
        height: 52,
        justifyContent: "center",
      }}
      onPress={() => router.push("/list")}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        Locations List
      </Text>
    </TouchableOpacity>
  );
};

export default LocationListBtn;
