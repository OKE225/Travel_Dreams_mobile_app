import { View, FlatList } from "react-native";
import React from "react";
import { useAuth } from "@/AuthContext";
import ListItem from "@/components/ListItem";

const Separator = () => (
  <View
    style={{
      width: "80%",
      height: 1,
      backgroundColor: "#d4d4d8",
      marginVertical: 12,
      marginHorizontal: "auto",
    }}
  />
);

const List = () => {
  const { locations } = useAuth();

  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => String(item.id)}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{ padding: 20 }}
    />
  );
};

export default List;
