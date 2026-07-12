import { Stack } from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" hidden />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="addLocation"
          options={{
            presentation: "formSheet",
            sheetAllowedDetents: [0.125, 0.5],
            sheetGrabberVisible: true,
            sheetCornerRadius: 30,
            headerBackButtonDisplayMode: "minimal",
            title: "Add new location",
          }}
        />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}
