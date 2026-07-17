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
import { supabase } from "@/lib/supabase";

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
            // paddingHorizontal: 24,
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
          {username && <Text style={{ fontSize: 32 }}>{username}</Text>}
          <Text style={{ color: "#3f3f46" }}>{email}</Text>

          <View
            style={{
              marginTop: 32,
              // gap: 10,
              backgroundColor: "#14b8a6",
              flex: 1,
              width: "100%",
              padding: 24,
              justifyContent: "space-between",
            }}>
            <View style={{ gap: 10 }}>
              <Link href="/list" style={styles.btn}>
                My locations list
              </Link>
              <Link href="/profile" style={styles.btn}>
                Profile settings
              </Link>
            </View>
            <TouchableOpacity
              onPress={() => supabase.auth.signOut()}
              style={[styles.btn, { backgroundColor: "#dc2626" }]}>
              <Text style={{ color: "white" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </>
  );
};

export default Menu;

const styles = StyleSheet.create({
  btn: {
    fontSize: 22,
    backgroundColor: "#0d9488",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 100,
    color: "white",
  },
});
