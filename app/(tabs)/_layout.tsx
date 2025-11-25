import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import useAppTheme from '@/hooks/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'



const TabsLayout = () => {

  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.text,
      // tabBarShowLabel:false,
      tabBarStyle: {
        backgroundColor: colors.surface,

        borderTopColor: colors.border,
        paddingBottom: 0,
        height:60+ insets.bottom,


      },
      tabBarItemStyle: {

      }, 
     
    
    }}>
      <Tabs.Screen name="index"
        options={{
        
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          )
        }}    
      
      />
       <Tabs.Screen name="dummy"
        options={{
         title:"Add",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          )
        }} 
         listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
          },
        })}

      />
      <Tabs.Screen name="about_page"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          )
        }}

      />

    </Tabs>
  )
}

export default TabsLayout