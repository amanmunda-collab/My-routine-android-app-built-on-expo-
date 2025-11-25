import { View, Text } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState, useContext } from 'react'
import { useFilterScreenChildren } from 'expo-router/build/layouts/withLayoutContext';

// very important note
// remember to use "use" keyword before the hookname or function name so that react go to know that expo save
// the state so that it doesn't hot reloads the values that you have to state. // 



// dark and ligh colors and the interface as a ColorScheme type 

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  primary: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#0f172a", "#1e293b"],
    surface: ["#1e293b", "#334155"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  statusBarStyle: "light-content" as const,
};

/// Step - 1 . defining the theme types or blueprints
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

// step 2 - creating the context (it holds the value )
// Contexts are used to provide values or data across the entire app , so we dont have 
// calculate it everywhere ... 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Step 3. creating the context provider 
// it returns value or the data 
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // using useState() to set value for is isDarkMode

  const [isDarkMode, setIsDarkMode] = useState(false);
  // getting the users choice from storage when the app starts or by changing the array, we can 
  //  set it run whenever the data changes  // 

  useEffect(() => {
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value)); // instead of parsing we can also directly use strings

    });
  }, []);/// empty array ensures it runs only when the app starts ,
  // for example - if we pass a value [count], then the code , will run whenever the value changes

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  };
  const colors = isDarkMode ? darkColors : lightColors;



  // Step 4 : Broadcasting the data 
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }} >
      {children}
    </ThemeContext.Provider>
  );
};



// creating the hook 
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {

    throw new Error("Used theme is not supported ");
  } return context;

};

export default useAppTheme;