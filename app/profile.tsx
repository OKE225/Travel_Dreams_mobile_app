import React from "react";
import Account from "@/components/Account";
import { useAuth } from "@/AuthContext";

const ProfileScreen = () => {
  const { userId, email } = useAuth();

  return <Account userId={userId} email={email} />;
};

export default ProfileScreen;
