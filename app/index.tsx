import Auth from "@/components/Auth";
import HomeScreen from "@/components/HomeScreen";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

import { ActivityIndicator, View } from "react-native";

export default function AppScreen() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>{!session ? <Auth /> : <HomeScreen />}</View>
  );
}
