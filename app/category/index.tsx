import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { useCategories } from "../../data/hooks";
import { Category } from "../../types/category";
import { Text } from "../../components/common/text";
import { Card } from "../../components/common/card";
import { useTheme } from "../../styles/hooks";
import { NativeSafeArea } from "../../styles/utils";
import { Loader } from "../../components/common/loader";

type CategoryScreenProps = NativeStackScreenProps<any>;

const CategoryCard = ({ category }: { category: Category }) => {
  const theme = useTheme();

  return (
    <Card
      style={[
        {
          padding: 12,
          marginBottom: 12,
        },
      ]}
      onPress={() => {}}
    >
      <Text>{category.name}</Text>
    </Card>
  );
};

const CategoryList = ({ categories }: { categories: Category[] }) => {
  const renderItem = ({ item }: ListRenderItemInfo<Category>) => {
    return <CategoryCard category={item} />;
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const CategoriesScreen = ({}: CategoryScreenProps) => {
  const { categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      <NativeSafeArea>
        <View className="p-4">
          <CategoryList categories={categories} />
        </View>
      </NativeSafeArea>
    </ScrollView>
  );
};

export default CategoriesScreen;