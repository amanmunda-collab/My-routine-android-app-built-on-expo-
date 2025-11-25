import { Text, StyleSheet, View, TouchableOpacity, ScrollView, StatusBar, FlatList, Alert, TextInput } from "react-native";
import { Link } from "expo-router"
import useAppTheme, { ColorScheme } from "@/hooks/appTheme";
import { api } from "@/convex/_generated/api"
import { useQuery, useMutation } from "convex/react";
import { getTodos, toggleToDo } from "@/convex/todos";
import { createHomeStyles } from "@/assets/images/styles/home.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { use, useState } from "react";
import EmptyState from "@/components/EmptyState";

type Todo = Doc<'todos'>;

export default function Index() {

  const getTodos = useQuery(api.todos.getTodos);
  console.log(getTodos);
  const toggleTodo = useMutation(api.todos.toggleToDo);
  const addToDo = useMutation(api.todos.addTodo);
  const deleteToDo = useMutation(api.todos.deleteToDo);
  const updateToDo = useMutation(api.todos.updateToDo);
  const clearAll = useMutation(api.todos.clearAllToDo);
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editingText, setEditingText] = useState<string>("");


  const { colors, toggleDarkMode } = useAppTheme();
  const styles = createHomeStyles(colors);
  const isLoading = getTodos === undefined;
 
  // functions 
  const handleToggleTodo = async (todoId: Id<"todos">) => {
    try {
      await toggleTodo({ id: todoId });
    } catch (error) {
      console.log("Error toggling todo");
      Alert.alert("Error", "Failed to toggle todo. Please try again.");
    }
  };
  const handleDeleteTodo = async (todoId: Id<"todos">) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteToDo({ id: todoId });
            } catch (error) {
              console.log("Error deleting todo:", error);
              Alert.alert("Error", "Failed to delete todo. Please try again.");
            }
          }
        }]);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingId(todo._id);
    setEditingText(todo.text);

  };


  const handleSaveEdit = async () => {

    if (editingId) {
      try {
        await updateToDo({ id: editingId, text: editingText });
        setEditingId(null);
      } catch (error) {
        console.log("Error updating todo:", error);
        Alert.alert("Error", "Failed to update todo. Please try again.");

      }
    }
  }


  const handleCancelEdit = () => {

    setEditingId(null);
    setEditingText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient style={styles.todoItem} colors={colors.gradients.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity style={styles.checkbox} activeOpacity={0.7} onPress={() => handleToggleTodo(item._id)}>
            <LinearGradient colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted} style={[styles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }]} >
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="white" />}
            </LinearGradient>
          </TouchableOpacity>

          {
            isEditing ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editingText}
                  onChangeText={setEditingText}
                  autoFocus
                  multiline
                  placeholder="Edit todo text"
                  placeholderTextColor={colors.textMuted}

                />
                <View style={styles.editButtons}>

                  <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.success} style={styles.actionButton}>
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                      <Ionicons name="close" size={16} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

            ) : (
              <View style={styles.todoTextContainer}>
                <Text style={[styles.todoText, item.isCompleted && { textDecorationLine: "line-through", color: colors.textMuted, opacity: 0.6 }]}>{item.text}

                </Text>
                {/* edit text and delete todo buttons  */}
                <View style={styles.todoActions}>
                  <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.warning} style={styles.actionButton}>
                      <Ionicons name="pencil" size={14} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                    <LinearGradient colors={colors.gradients.danger} style={styles.actionButton}>
                      <Ionicons name="trash" size={14} color="#fff" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )
          }

        </LinearGradient>

      </View>
    )
  }
  /// we will use array syntax for styles inside text component //
  // it merges the properties and the last property wins

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} backgroundColor="transparent"
        translucent={true} />

      <SafeAreaView
        style={styles.safeArea}
      >
        <Header />
        <TodoInput />
       

        <FlatList
          data={getTodos}
          keyExtractor={(item) => item._id}
          renderItem={renderTodoItem}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />



      </SafeAreaView>


    </LinearGradient>
  )
}



