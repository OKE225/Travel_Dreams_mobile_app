import { Text, View } from "react-native";
import React from "react";
import { Callout, Marker } from "react-native-maps";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const CustomMarker = ({
  latitude,
  longitude,
  title,
}: {
  latitude: number;
  longitude: number;
  title: string;
}) => {
  return (
    <Marker
      coordinate={{
        latitude: latitude,
        longitude: longitude,
      }}
      // pinColor="turquoise"
      // pinColor="#14b8a6"
      title={title}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 20,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <MaterialCommunityIcons name="human-child" size={38} color="white" />
        <Callout tooltip>
          <Text>{title}</Text>
        </Callout>
      </View>
    </Marker>
  );
};

export default CustomMarker;
