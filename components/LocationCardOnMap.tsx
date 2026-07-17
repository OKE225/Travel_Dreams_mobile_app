import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LocationRow } from "@/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import LocationImage from "./LocationImage";

interface LocationCardProps {
  location: LocationRow;
  onClose: () => void;
}

const LocationCardOnMap = ({ location, onClose }: LocationCardProps) => {
  return (
    <SafeAreaView
      style={{
        position: "absolute",
        bottom: 0,
        left: 15,
        right: 15,
        alignItems: "center",
        zIndex: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fafafa",
          borderRadius: 20,
          padding: 10,
          width: "100%",
          height: 150,
          elevation: 2,
          flexDirection: "row",
          gap: 8,
        }}>
        <View style={{ height: "100%", aspectRatio: 1 }}>
          <LocationImage path={location.image_path} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: "500" }} numberOfLines={1}>
            {location.title}
          </Text>
          <Text
            style={{ color: "#3f3f46", flexShrink: 1 }}
            numberOfLines={6}
            ellipsizeMode="tail">
            {location.description}
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            right: 6,
            top: 6,
            width: 32,
          }}>
          <Ionicons name="close" size={32} color="black" onPress={onClose} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationCardOnMap;
