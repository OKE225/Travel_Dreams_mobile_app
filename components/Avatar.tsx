import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Alert, Image, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      } else {
        console.log("Error downloading image: ", error);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        aspect: [1, 1],
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer(),
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        console.log(error);
        Alert.alert("Unexpected error");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[
            avatarSize,
            {
              borderRadius: 100,
              overflow: "hidden",
              maxWidth: "100%",
              marginBottom: 20,
              objectFit: "cover",
              paddingTop: 0,
            },
          ]}
        />
      ) : (
        <View
          style={[
            avatarSize,
            {
              borderRadius: 100,
              overflow: "hidden",
              maxWidth: "100%",
              marginBottom: 20,
              backgroundColor: "#333",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgb(200, 200, 200)",
            },
          ]}
        />
      )}
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#14b8a6",
            borderRadius: 40,
            padding: 12,
            alignItems: "center",
            opacity: uploading ? 0.5 : 1,
          }}
          onPress={uploadAvatar}
          disabled={uploading}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {uploading ? "Uploading ..." : "Upload"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
