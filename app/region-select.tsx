import {
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Text } from "../components/common/text";
import { useRegion } from "../data/region-context";
import { Region } from "@medusajs/medusa-js";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useCustomer } from "../data/customer-context";

const RegionSelect = () => {
  const { regions, setRegion } = useRegion();
  const navigation = useNavigation();
  const { fetchCustomer } = useCustomer();

  useFocusEffect(
    useCallback(() => {
      fetchCustomer();
    }, [fetchCustomer])
  );

  const renderRegionItem: ListRenderItem<Region> = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setRegion(item);
        navigation.goBack();
      }}
      className="w-full border-b border-b-gray-200 p-4"
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={regions}
        renderItem={renderRegionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default RegionSelect;