import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useState } from "react";

import silverMapStyle from "../app/silver-map.json";
// import darkMapStyle from "../app/dark-map.json";

const Map = () => {
  const [picked, setPicked] = useState<{
    latitude: number;
    longitude: number;
    title: string;
  } | null>(null);

  const handleLongPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });

    const title =
      place?.city || place?.district || place?.region || "Unknown Area";

    setPicked({ latitude, longitude, title });
  };

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE}
        customMapStyle={silverMapStyle}
        style={{ width: "100%", height: "100%" }}
        onLongPress={handleLongPress}>
        {picked && (
          <Marker
            coordinate={{
              latitude: picked.latitude,
              longitude: picked.longitude,
            }}
            title={picked.title}
          />
        )}
      </MapView>
    </>
  );
};

export default Map;
