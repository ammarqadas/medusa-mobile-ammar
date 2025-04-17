import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRegion } from "../data/region-context";
import { useEffect } from "react";
import { useRouter } from "expo-router";

const Splash = () => {
  const { region, isLoading } = useRegion();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (region) {
        router.replace("/");
      } else {
        router.replace("/region-select");
      }
    }
  }, [isLoading, region, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Splash;