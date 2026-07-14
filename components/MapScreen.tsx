import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Map from "./Map";
import AvatarImage from "./AvatarImage";
import Menu from "./Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import LocationListBtn from "./LocationListBtn";
import { useAuth } from "@/AuthContext";
import { Marker } from "react-native-maps";

const MapScreen = () => {
  const { locations } = useAuth();

  return (
    <View>
      <Map stylesCss={{ width: "100%", height: "100%" }}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        ))}
      </Map>

      <Menu />
      <AvatarImage />

      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: "center",
        }}>
        <LocationListBtn />
      </SafeAreaView>

      <SafeAreaView
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/addLocation")}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  button: {
    position: "relative",
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 28,
    backgroundColor: "#14b8a6",
    justifyContent: "center",
    alignItems: "center",
    // elevation: 4,
  },
  buttonText: {
    fontSize: 32,
    lineHeight: 28,
    color: "white",
  },
});
