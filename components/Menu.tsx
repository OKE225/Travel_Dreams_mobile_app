import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  Easing,
} from "react-native-reanimated";
import { useAuth } from "@/AuthContext";
import { Link } from "expo-router";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const durationTime = 100;

  const { avatarUrl, username, email } = useAuth();

  return (
    <>
      <TouchableOpacity
        style={{ position: "absolute", top: 64, left: 16, zIndex: 20 }}
        onPress={() => setIsOpen((prev) => !prev)}>
        <Ionicons name={isOpen ? "close" : "menu"} size={32} color="black" />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={SlideInLeft.duration(durationTime).easing(
            Easing.out(Easing.cubic),
          )}
          exiting={SlideOutLeft.duration(durationTime).easing(
            Easing.in(Easing.cubic),
          )}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#e4e4e7",
            // backgroundColor: "#14b8a6",
            paddingTop: 48 + 64,
            paddingHorizontal: 24,
            zIndex: 10,
            alignItems: "center",
          }}>
          <Image
            source={{ uri: avatarUrl }}
            style={{
              height: 128,
              width: 128,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
          <Text style={{ fontSize: 32 }}>{username}</Text>
          <Text style={{}}>{email}</Text>

          <View style={{ marginTop: 32, alignItems: "center", gap: 12 }}>
            <Link href="/list" style={styles.btn}>
              My locations list
            </Link>
            <Link href="/profile" style={styles.btn}>
              Profile settings
            </Link>
            <Text>Switch theme (light/dark)</Text>
            <Text>Logout</Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  btn: {
    fontSize: 18,
    backgroundColor: "#14b8a6",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white",
  },
});

// - dodać deafult zdjęcie profilowe
// - sprawdzić jak działa aplikacja gdy nie zaaktualizowałeś zdjęcia i nicku
