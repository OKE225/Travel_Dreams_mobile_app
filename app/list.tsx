import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/AuthContext";
import LocationImage from "@/components/LocationImage";

const List = () => {
  const { locations } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}>
      {locations.map((location) => {
        return (
          <View key={location.id} style={{ flexDirection: "row" }}>
            <View style={{ width: 100, height: 100 }}>
              <LocationImage path={location.image_path} />
            </View>

            <View>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {location.title}
              </Text>
              <Text>{location.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default List;
