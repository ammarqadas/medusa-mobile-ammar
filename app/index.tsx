import React from 'react';
import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/home/header';
import { HeroCarousel } from '../components/home/hero-carousel';
import { FeaturedCollection } from '../components/home/featured-collection';
import { ProductList } from '../components/product/product-list';
import { useCustomer } from '../data/customer-context';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { customer } = useCustomer();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <HeroCarousel />
        <FeaturedCollection />
        <ProductList title="All Products" />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;