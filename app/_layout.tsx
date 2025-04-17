import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="cart" options={{ title: 'Cart' }} />
      <Stack.Screen name="checkout" options={{ title: 'Checkout' }} />
      <Stack.Screen name="product-detail" options={{ title: 'Product Detail' }} />
      <Stack.Screen name="region-select" options={{ title: 'Region Select' }} />
      <Stack.Screen name="splash" options={{ title: 'Splash' }} />
      <Stack.Screen name="address/address-form" options={{ title: 'Address Form' }} />
      <Stack.Screen name="address/address-list" options={{ title: 'Address List' }} />
      <Stack.Screen name="auth/login" options={{ title: 'Login' }} />
      <Stack.Screen name="auth/register" options={{ title: 'Register' }} />
      <Stack.Screen name="category/categories" options={{ title: 'Categories' }} />
      <Stack.Screen name="category/category-detail" options={{ title: 'Category Detail' }} />
      <Stack.Screen name="collection/collection-detail" options={{ title: 'Collection Detail' }} />
      <Stack.Screen name="collection/collections" options={{ title: 'Collections' }} />
      <Stack.Screen name="order/order-detail" options={{ title: 'Order Detail' }} />
      <Stack.Screen name="order/orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="profile/profile-detail" options={{ title: 'Profile Detail' }} />
      <Stack.Screen name="profile/profile" options={{ title: 'Profile' }} />
      
    </Stack>
  );
}