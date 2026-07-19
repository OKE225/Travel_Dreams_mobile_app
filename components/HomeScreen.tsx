import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import Map from "./Map";
import AvatarImage from "./AvatarImage";
import Menu from "./Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import LocationListBtn from "./LocationListBtn";
import { LocationRow, useAuth } from "@/AuthContext";
import { Marker } from "react-native-maps";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LocationCardOnMap from "./LocationCardOnMap";

const HomeScreen = () => {
  const { locations, refetchLocations } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<LocationRow | null>(
    null,
  );

  useFocusEffect(
    useCallback(() => {
      refetchLocations();
    }, [refetchLocations]),
  );

  return (
    <View style={{ flex: 1 }}>
      <Map
        stylesCss={{ width: "100%", height: "100%" }}
        onMapPress={() => setSelectedLocation(null)}>
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => setSelectedLocation(location)}>
            <View
              style={{
                width: 38,
                height: 38,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <MaterialIcons name="location-pin" size={37} color="#14b8a6" />
            </View>
          </Marker>
        ))}
      </Map>

      {selectedLocation && (
        <LocationCardOnMap
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}

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

export default HomeScreen;

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
  },
  buttonText: {
    fontSize: 32,
    lineHeight: 28,
    color: "white",
  },
});
