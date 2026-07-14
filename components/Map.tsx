import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";

import silverMapStyle from "../maps_theme/silver-map.json";

import { router, useLocalSearchParams, usePathname } from "expo-router";
import CustomMarker from "./CustomMarker";

const Map = ({ stylesCss, children }: any) => {
  const pathname = usePathname();
  const mapRef = useRef<MapView>(null);

  const { latitude, longitude, title } = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
    title?: string;
  }>();

  useEffect(() => {
    if (pathname === "/addLocation" && latitude && longitude) {
      mapRef.current?.animateToRegion(
        {
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        },
        500,
      );
    }
  }, [pathname, latitude, longitude]);

  const [picked, setPicked] = useState<{
    latitude: number;
    longitude: number;
    title: string;
  } | null>(null);

  const handleLongPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    const title =
      place?.city || place?.district || place?.region || "Unknown Area";

    setPicked({ latitude, longitude, title });
    router.push({
      pathname: "/addLocation",
      params: {
        latitude: String(latitude),
        longitude: String(longitude),
        title,
      },
    });
  };

  const handlePress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
    const title =
      place?.city || place?.district || place?.region || "Unknown Area";

    setPicked({ latitude, longitude, title });
    router.setParams({
      latitude: String(latitude),
      longitude: String(longitude),
      title,
    });
  };

  const markerFromParams =
    pathname === "/addLocation" && latitude && longitude
      ? {
          latitude: Number(latitude),
          longitude: Number(longitude),
          title: title ?? "Unknown Area",
        }
      : null;

  const markerData = markerFromParams ?? picked;
  const unFocusMarker = () => {
    setPicked(null);
  };

  return (
    <MapView
      ref={mapRef}
      showsUserLocation
      showsMyLocationButton={false}
      provider={PROVIDER_GOOGLE}
      customMapStyle={silverMapStyle}
      initialRegion={{
        latitude: 50.266,
        longitude: 19.025,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
      }}
      style={stylesCss}
      onPress={pathname === "/addLocation" ? handlePress : unFocusMarker}
      onLongPress={pathname === "/addLocation" ? undefined : handleLongPress}>
      {children}
      {markerData && (
        <CustomMarker
          title={markerData.title}
          latitude={markerData.latitude}
          longitude={markerData.longitude}
        />
      )}
    </MapView>
  );
};

export default Map;
