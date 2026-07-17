import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { View, Alert, TextInput, Text, TouchableOpacity } from "react-native";
import Avatar from "./Avatar";

export default function Account({
  userId,
  email,
}: {
  userId: string;
  email?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (userId) getProfile();
  }, [userId]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", userId)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);

      const updates = {
        id: userId,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ marginTop: 40, padding: 12 }}>
      <View>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({ username, avatar_url: url });
          }}
        />
      </View>
      <View
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: "stretch",
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#86939e",
            marginBottom: 6,
          }}>
          Email
        </Text>
        <TextInput
          value={email ?? ""}
          editable={false}
          selectTextOnFocus={false}
          style={{
            borderWidth: 1,
            borderRadius: 50,
            padding: 12,
            fontSize: 16,
            backgroundColor: "#f2f2f2",
            borderColor: "#d1d1d1",
            color: "#9e9e9e",
          }}
        />
      </View>
      <View style={{ paddingTop: 4, paddingBottom: 4, alignSelf: "stretch" }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#86939e",
            marginBottom: 6,
          }}>
          Username
        </Text>
        <TextInput
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
          style={{
            borderWidth: 1,
            borderColor: "#86939e",
            borderRadius: 50,
            padding: 12,
            fontSize: 16,
          }}
        />
      </View>

      <View
        style={{
          paddingTop: 4,
          paddingBottom: 4,
          alignSelf: "stretch",
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#14b8a6",
            borderRadius: 50,
            padding: 12,
            alignItems: "center",
            opacity: loading ? 0.5 : 1,
          }}
          onPress={() => updateProfile({ username, avatar_url: avatarUrl })}
          disabled={loading}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {loading ? "Loading ..." : "Update"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingTop: 4, paddingBottom: 4, alignSelf: "stretch" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#14b8a6",
            borderRadius: 50,
            padding: 12,
            alignItems: "center",
          }}
          onPress={() => supabase.auth.signOut()}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
