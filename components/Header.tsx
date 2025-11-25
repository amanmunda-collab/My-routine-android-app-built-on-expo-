import { View, Text } from 'react-native';
import React from 'react';
import { useQuery } from 'convex/react';
import {api} from "@/convex/_generated/api";
import useAppTheme from '@/hooks/appTheme';
import { createHomeStyles } from '@/assets/images/styles/home.style';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {

const todos = useQuery(api.todos.getTodos);
const {colors} = useAppTheme();
const homeStyles = createHomeStyles(colors);
const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length :0;
const totalTodos = todos ? todos.length : 0;
const progressPercentage = totalTodos >0 ? (completedTodos/totalTodos)* 100 : 0;


  return (
    <View style = {homeStyles.header}>
        <View style={homeStyles.titleContainer}>
            <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
                <Ionicons name = "alarm-outline" size = {28} color = "white"/> 
                </LinearGradient>
                <View style={homeStyles.titleTextContainer}>
<Text style={homeStyles.title}>My Routine</Text>
<Text style={homeStyles.subtitle}>
    {completedTodos} of {totalTodos} completed
</Text>
                    </View>
            </View>

         {/* progress bar section */}
        <View style={homeStyles.progressContainer}>

            <View style={homeStyles.progressBarContainer}>
           <View style = {homeStyles.progressBar}>
            <LinearGradient colors = {colors.gradients.success}
                style = {[homeStyles.progressFill,{width:`${progressPercentage}%`}]}
             />
           </View>
           <Text style = {homeStyles.progressText}> {Math.round(progressPercentage)}%</Text>
                
            </View>
        </View>    
    </View>
  )
}

export default Header