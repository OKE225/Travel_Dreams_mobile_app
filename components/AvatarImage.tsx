import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/AuthContext";
import { useRouter } from "expo-router";

const AvatarImage = () => {
  const { avatarUrl } = useAuth();

  // if (!avatarUrl) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>Brak avatara</Text>
  //     </View>
  //   );
  // }

  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        top: 64,
        right: 16,
      }}
      onPress={() => router.push("/profile")}>
      <Image
        source={{ uri: avatarUrl }}
        style={{
          height: 42,
          width: 42,
          borderRadius: 50,
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default AvatarImage;
