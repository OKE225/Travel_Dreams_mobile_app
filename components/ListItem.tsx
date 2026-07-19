import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import LocationImage from "./LocationImage";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { supabase } from "@/lib/supabase";
import { LocationRow, useAuth } from "@/AuthContext";

interface ListItemProps {
  item: LocationRow;
}

const ListItem = ({ item }: ListItemProps) => {
  const { refetchLocations } = useAuth();

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

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("locations")
        .delete()
        .eq("id", item.id);

      if (error) {
        console.error("Error deleting locations:", error);
        return;
      }

      await refetchLocations();
    } catch (error) {
      console.error(error);
    }
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

      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 22, fontWeight: "500" }}>{item.title}</Text>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons name="delete-outline" size={26} color="#dc2626" />
          </TouchableOpacity>
        </View>
        <Text style={{ color: "#3f3f46" }}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
