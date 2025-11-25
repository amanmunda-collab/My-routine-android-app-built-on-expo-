import { createHomeStyles } from "@/assets/images/styles/home.style";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import useAppTheme from '@/hooks/appTheme';

const EmptyState = () => {
  const { colors } = useAppTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.emptyContainer}>
      <LinearGradient colors={colors.gradients.empty} style={homeStyles.emptyIconContainer}>
        <Ionicons name="clipboard-outline" size={60} color={colors.textMuted} />
      </LinearGradient>
      <Text style={homeStyles.emptyText}>No todos yet!</Text>
      <Text style={homeStyles.emptySubtext}>Add your first todo above to get started</Text>
    </View>
  );
};
export default EmptyState;