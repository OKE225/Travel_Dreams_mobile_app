import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Map from "@/components/Map";
import { router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";

const AddLocation = () => {
  const { latitude, longitude, title } = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
    title?: string;
  }>();

  const [placeDescription, setPlaceDescription] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const uploadPicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      exif: false,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      console.log("User cancelled image picker.");
      return;
    }

    const image = result.assets[0];
    console.log("Got image", image);

    if (!image.uri) throw new Error("No image uri!");

    setImageUri(image.uri);
  };

  const handleSubmit = async () => {
    try {
      let imagePath = null;

      if (imageUri) {
        const arraybuffer = await fetch(imageUri).then((res) =>
          res.arrayBuffer(),
        );
        const fileExt = imageUri.split(".").pop()?.toLowerCase() ?? "jpeg";
        const path = `locations/${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("location-images")
          .upload(path, arraybuffer, {
            contentType: "image/jpeg",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        imagePath = uploadData.path;
      }

      const { data: insertedLocation, error: insertError } = await supabase
        .from("locations")
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          title: title ?? "",
          description: placeDescription,
          latitude: Number(latitude),
          longitude: Number(longitude),
          image_path: imagePath,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      console.log("Inserted location:", insertedLocation);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isSubmitDisabled = !latitude && !longitude;

  return (
    <View
      style={{
        marginTop: 24,
        paddingHorizontal: 12,
      }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>
        {title ? title : "Select a place"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginBottom: 10,
        }}>
        <View style={styles.inputContainer}>
          <Text style={{ color: "#3f3f46" }}>latitude</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={latitude ?? ""}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ color: "#3f3f46" }}>longitude</Text>
          <TextInput
            style={styles.input}
            editable={false}
            value={longitude ?? ""}
          />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: "40%",
          marginBottom: 10,
        }}>
        <Map
          stylesCss={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 4 }}>
        <View style={{ width: 100, height: 100 }}>
          <TouchableOpacity onPress={uploadPicture}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 12,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#d4d4d8",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  borderRadius: 12,
                }}>
                <Text
                  style={{ textAlign: "center", padding: 6, color: "#3f3f46" }}>
                  Place the photo here
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            borderColor: "#a1a1aa",
            borderWidth: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: 100,
            borderRadius: 12,
          }}>
          <TextInput
            placeholder="Type something about this place."
            placeholderTextColor="grey"
            numberOfLines={4}
            maxLength={128}
            multiline={true}
            value={placeDescription}
            onChangeText={setPlaceDescription}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isSubmitDisabled && { opacity: 0.5 }]}
        onPress={handleSubmit}
        disabled={isSubmitDisabled}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: "#e4e4e7",
    color: "#3f3f46",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 50,
  },
  button: {
    borderRadius: 28,
    backgroundColor: "#14b8a6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 22,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
