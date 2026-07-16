import { Text, View } from "react-native";
import React from "react";
import { Callout, Marker } from "react-native-maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
      title={title}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <MaterialIcons name="push-pin" size={39} color="#ef4444" />
        <Callout tooltip>
          <Text>{title}</Text>
        </Callout>
      </View>
    </Marker>
  );
};

export default CustomMarker;
