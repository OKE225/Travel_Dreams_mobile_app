import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "@/AuthContext";
import { useRouter } from "expo-router";

const AvatarImage = () => {
  const { avatarUrl } = useAuth();

  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 64,
        right: 16,
      }}
      onPress={() => router.push("/profile")}>
      {!avatarUrl ? (
        <View
          style={{
            backgroundColor: "#d4d4d8",
            width: 42,
            height: 42,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 28, fontWeight: 900, color: "#3f3f46" }}>
            ?
          </Text>
        </View>
      ) : (
        <Image
          source={{ uri: avatarUrl }}
          style={{
            height: 42,
            width: 42,
            borderRadius: 50,
          }}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
};

export default AvatarImage;
