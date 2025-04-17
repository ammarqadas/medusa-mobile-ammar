import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Collection } from "../../app/types/common";
import { client } from "../../app/api/client";
import { useRegion } from "../../app/data/region-context";
import { ProductList } from "../components/product/product-list";

type CollectionDetailParams = {
  id: string;
};

const CollectionDetail = () => {
  const [collection, setCollection] = useState<Collection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useLocalSearchParams<CollectionDetailParams>();
  const { region } = useRegion();

  useEffect(() => {
    const fetchCollection = async () => {
      setIsLoading(true);
      try {
        const { collection } = await client.collections
          .retrieve(id, {
            region_id: region?.id,
          })
          .then((res) => res.data);
        setCollection(collection);
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [id, region?.id]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!collection) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Collection not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold">{collection.title}</Text>
        <Text className="text-gray-500">{collection.handle}</Text>
      </View>
      <ProductList
        collectionId={collection.id}
        regionId={region?.id}
        max={10}
      />
    </View>
  );
};

export default CollectionDetail;