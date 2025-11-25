
import { Stack } from "expo-router";
import { ThemeProvider } from "@/hooks/appTheme";
import * as SplashScreen from 'expo-splash-screen';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// shows splash screen until fonts are loaded
SplashScreen.preventAutoHideAsync();
// 1. SAFETY CHECK FOR URL
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  // This helps you debug if the APK crashes on startup
  console.error("❌ CRITICAL: EXPO_PUBLIC_CONVEX_URL is missing. Did you run 'eas secret:create'?");
}
const convex = new ConvexReactClient(convexUrl || "https://vivid-ermine-957.convex.cloud", {
  unsavedChangesWarning: false,
});

export default function RootLayout() {

 
   const [loaded, error] = useFonts({
    // This loads the specific .ttf file for Ionicons
    ...Ionicons.font, 
   
    // 'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) {
        console.error("Font loading error:", error);
        throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  // crash guard 
  // 6. CRASH GUARD: If not loaded yet, return NULL.
  // This stops the app from trying to render <Ionicons> before the font exists.
  if (!loaded) {
    return null;
  }
  
 


  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ title: "Home" }} />

        </Stack>
      </ThemeProvider>
    </ConvexProvider>




  );
}
