import Account from "@/components/Account";
import Auth from "@/components/Auth";
import Map from "@/components/Map";
import MapScreen from "@/components/MapScreen";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

import { View } from "react-native";

export default function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getClaims().then(({ data, error }) => {
      const claims = data?.claims;

      if (claims) {
        setUserId(claims.sub);
        setEmail(claims.email);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async () => {
      const { data } = await supabase.auth.getClaims();
      const claims = data?.claims;

      if (claims) {
        setUserId(claims.sub);
        setEmail(claims.email);
      } else {
        setUserId(null);
        setEmail(undefined);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <View>
      {!userId ? (
        <Auth />
      ) : (
        <Account key={userId} userId={userId} email={email} />
        // <MapScreen />
      )}
    </View>
  );
}
