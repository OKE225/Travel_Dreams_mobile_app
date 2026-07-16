import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LocationImage from "./LocationImage";
import { router } from "expo-router";

const ListItem = ({ item }: { item: any }) => {
  const handlePress = () => {
    router.push({
      pathname: "/",
      params: {
        latitude: String(item.latitude),
        longitude: String(item.longitude),
        title: item.title,
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 8,
      }}
      onPress={handlePress}>
      <View style={{ width: 100, height: 100 }}>
        <LocationImage path={item.image_path} />
      </View>

      <View>
        <Text style={{ fontSize: 22, fontWeight: "500" }}>{item.title}</Text>
        <Text style={{ color: "#3f3f46" }}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
