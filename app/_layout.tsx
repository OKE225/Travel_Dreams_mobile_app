import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" hidden />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="addLocation"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.75],
            sheetGrabberVisible: true,
            sheetCornerRadius: 36,
            headerBackButtonDisplayMode: "minimal",
            title: "Add New Location",
          }}
        />
        <Stack.Screen name="profile" options={{ title: "Profile Settings" }} />
        <Stack.Screen name="list" options={{ title: "My Dream Locations" }} />
      </Stack>
    </AuthProvider>
  );
}
