import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useAppTheme from '@/hooks/appTheme';
import { createHomeStyles } from '@/assets/images/styles/home.style';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TodoInput = () => {

    const {colors} = useAppTheme();
    const homeStyles = createHomeStyles(colors);
    const [newTodo,setNewTodo] = useState("");
    const addTodo = useMutation(api.todos.addTodo);
    const handleAddTodo = async () => {
 if(newTodo.trim()){
    try{
         await addTodo({text:newTodo.trim()});
        
    }catch(error){
        console.log("Error adding todo:",error);
        Alert.alert("Error","Failed to add todo. Please try again.");
        
    }
 }

    };

  return (
    <View>
      <View style={homeStyles.inputSection}>
<View style = {homeStyles.inputWrapper}>
    <TextInput 
    style = {homeStyles.input}
    placeholder="Add a new task"
    value = {newTodo}
    onChangeText = {setNewTodo}
    onSubmitEditing={handleAddTodo}
    placeholderTextColor={colors.textMuted}
    />
    <TouchableOpacity onPress = {handleAddTodo} activeOpacity = {0.8} disabled = {!newTodo.trim()} >
 <LinearGradient 
 colors = {newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
  style = {[homeStyles.addButton,!newTodo.trim() && homeStyles.addButtonDisabled ]}
 >
    <Ionicons name = "add" size = {24} color = "white" />

 </LinearGradient>
    </TouchableOpacity>
</View>

        </View>
    </View>
  )
}

export default TodoInput