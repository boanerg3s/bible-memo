import React from "react";
import { AppStyles } from "@/styles";
import { Tabs } from "expo-router/tabs";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";

export default function TabsLayout() {
  const iconRenderer = (name: string) => {
    return (props: { focused: boolean; color: string; size: number }) => {
      const { color, size } = props;
      return <Entypo name={name as any} size={size} color={color} />;
    };
  };

  return (
    <React.Fragment>
      <StatusBar backgroundColor={AppStyles.color.lightGray} />

      <Tabs
        initialRouteName="home"
        screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: AppStyles.color.primary }}
      >
        <Tabs.Screen name="home" options={{ href: "/home", tabBarIcon: iconRenderer("book") }} />
        <Tabs.Screen name="notification" options={{ href: "/notification", tabBarIcon: iconRenderer("bell") }} />
        <Tabs.Screen name="config" options={{ href: "/config", tabBarIcon: iconRenderer("cog") }} />
      </Tabs>
    </React.Fragment>
  );
}
