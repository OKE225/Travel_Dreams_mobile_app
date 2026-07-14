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
import { useLocalSearchParams } from "expo-router";
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 12,
      }}>
      <Text>{title ? title : "Select a place"}</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 12,
        }}>
        <TextInput
          style={styles.input}
          editable={false}
          value={latitude ?? ""}
        />
        <TextInput
          style={styles.input}
          editable={false}
          value={longitude ?? ""}
        />
      </View>

      <View
        style={{
          width: "100%",
          height: "20%",
        }}>
        <Map
          stylesCss={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View
        style={{
          borderColor: "gray",
          borderWidth: 1,
          padding: 5,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: 150,
          width: "100%",
        }}>
        <TextInput
          // style={{
          //   justifyContent: "flex-start",
          //   alignItems: "flex-start",
          // }}
          placeholder="Type something about this place."
          placeholderTextColor="grey"
          numberOfLines={5}
          multiline={true}
          value={placeDescription}
          onChangeText={setPlaceDescription}
        />
      </View>

      <View style={{ width: 150, height: 150 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
          onPress={uploadPicture}>
          {/* <Text style={{ textAlign: "center" }}>Upload photo</Text> */}
        </TouchableOpacity>
      </View>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 150, height: 150, borderRadius: 16, marginTop: 12 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddLocation;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "silver",
    color: "black",
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  button: {
    borderRadius: 28,
    backgroundColor: "#14b8a6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 18,
    // elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
