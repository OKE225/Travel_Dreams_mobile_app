import { Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  Easing,
} from "react-native-reanimated";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const durationTime = 100;

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
            paddingTop: 48 + 64,
            paddingHorizontal: 24,
            zIndex: 10,
          }}>
          <Text>Menu</Text>
        </Animated.View>
      )}
    </>
  );
};

export default Menu;
