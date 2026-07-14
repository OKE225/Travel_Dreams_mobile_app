import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const LocationImage = ({ path }: { path: string | null }) => {
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!path) return;

      const { data, error } = await supabase.storage
        .from("location-images")
        .download(path);

      if (error) {
        console.log("download error:", error?.message);
        return;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setUri(fr.result as string);
      };
    };

    load();
  }, [path]);

  if (!uri) return null;

  return (
    <Image
      source={{ uri }}
      style={{ width: "100%", height: "100%", borderRadius: 10 }}
    />
  );
};

export default LocationImage;
