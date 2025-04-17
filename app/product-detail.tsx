import {
  View,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { useProduct } from "../data/hooks";
import { Text } from "../components/common/text";
import { ProductOptionSelect } from "../components/product/option-select";
import { Button } from "../components/common/button";
import { ProductPrice } from "../components/product/product-price";
import { ImageCarousel } from "../components/product/image-carousel";
import { useCart } from "../data/cart-context";
import { useTheme } from "../styles/hooks";
import { FABButton } from "../components/common/fab-button";
import { useCustomer } from "../data/customer-context";

export default function ProductDetailScreen() {
  const { addLineItem } = useCart();
  const { isCustomerLoggedIn } = useCustomer();
  const { theme } = useTheme();

  const { product, isLoading } = useProduct();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleAddToCart = async () => {
    if (product.variants?.length && !selectedVariant) {
      alert("Please select a variant");
      return;
    }

    await addLineItem({
      variantId: selectedVariant?.id || "",
      quantity: 1,
    });
  };

  const selectedVariant =
    product.variants && product.variants.length === 1
      ? product.variants[0]
      : product.variants?.find((v) =>
          v.options.every((option) => {
            const productOption = product.options.find(
              (po) => po.id === option.option_id
            );
            return productOption?.values.some((pov) => pov.id === option.value);
          })
        );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: product.title,
        }}
      />
      <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ paddingHorizontal: theme.spacing.large }}>
          <View style={{ marginTop: theme.spacing.large }}>
            <ImageCarousel images={product.images} />
          </View>
          <View style={{ marginVertical: theme.spacing.large }}>
            <Text bold large>
              {product.title}
            </Text>
          </View>
          {product.options?.length ? (
            <View style={{ marginVertical: theme.spacing.large }}>
              <ProductOptionSelect
                options={product.options}
                variants={product.variants}
              />
            </View>
          ) : null}
          <View style={{ marginVertical: theme.spacing.large }}>
            <ProductPrice
              product={product}
              variant={selectedVariant}
              textAlign="left"
            />
          </View>
          <View style={{ marginVertical: theme.spacing.large }}>
            <Text>{product.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          padding: theme.spacing.large,
          backgroundColor: theme.colors.background,
        }}
      >
        <Button onPress={handleAddToCart} disabled={!isCustomerLoggedIn}>
          Add To Cart
        </Button>
      </View>
    </View>
  );
}