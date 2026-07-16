import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  username: string | null;
  avatar_url: string | undefined;
};

type AuthContextType = {
  userId: string;
  email: string;
  username: string | null;
  avatarUrl: string | undefined;
  locations: LocationRow[];
  loading: boolean;
  refetch: () => Promise<void>;
  refetchLocations: () => Promise<void>;
};

export type LocationRow = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  image_path: string | null;
  created_at: string;
  updated_at: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState<LocationRow[]>([]);

  const fetchAuthData = async () => {
    setLoading(true);

    const { data: claimsData, error } = await supabase.auth.getClaims();
    if (error || !claimsData?.claims) {
      setUserId("");
      setEmail("");
      setUsername(null);
      setAvatarUrl(undefined);
      setLocations([]);
      setLoading(false);
      return;
    }

    const claims = claimsData.claims;
    setUserId(claims.sub);
    setEmail(claims.email ?? "");

    await fetchLocations(claims.sub);

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", claims.sub)
      .single();

    if (profileError) {
      setUsername(null);
      setAvatarUrl(undefined);
    } else {
      const p = profile as Profile;
      setUsername(p.username);

      if (p.avatar_url) {
        downloadImage(p.avatar_url);
      } else {
        setAvatarUrl(undefined);
      }
    }

    setLoading(false);
  };

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

  const fetchLocations = async (uid: string) => {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetchning locations:", error);
      setLocations([]);
      return;
    }

    setLocations(data ?? []);
  };

  useEffect(() => {
    fetchAuthData();

    const { data } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_OUT") {
        setUserId("");
        setEmail("");
        setUsername(null);
        setAvatarUrl(undefined);
        setLocations([]);
        setLoading(false);
        return;
      }

      await fetchAuthData();
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        email,
        username,
        avatarUrl,
        locations,
        loading,
        refetch: fetchAuthData,
        refetchLocations: async () => {
          if (userId) await fetchLocations(userId);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
