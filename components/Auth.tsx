import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={{ marginTop: 40, padding: 12 }}>
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
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#86939e",
            borderRadius: 40,
            padding: 12,
            fontSize: 16,
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
          Password
        </Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#86939e",
            borderRadius: 40,
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
            borderRadius: 40,
            padding: 12,
            alignItems: "center",
            opacity: loading ? 0.5 : 1,
          }}
          onPress={() => signInWithEmail()}
          disabled={loading}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 4, paddingBottom: 4, alignSelf: "stretch" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#14b8a6",
            borderRadius: 40,
            padding: 12,
            alignItems: "center",
            opacity: loading ? 0.5 : 1,
          }}
          onPress={() => signUpWithEmail()}
          disabled={loading}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
