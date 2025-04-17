import React from 'react';
import ThemeProvider from '@styles/theme-provider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Splash from '@screens/splash';
import Home from '@screens/home';
import Categories from '@screens/category/categories';
import CategoryDetail from '@screens/category/category-detail';
import Collections from '@screens/collection/collections';
import CollectionDetail from '@screens/collection/collection-detail';
import ProductDetail from '@screens/product-detail';
import Cart from '@screens/cart';
import Checkout from '@screens/checkout';
import Profile from '@screens/profile/profile';
import SignIn from '@screens/auth/login';
import Register from '@screens/auth/register';
import Orders from '@screens/order/orders';
import OrderDetail from '@screens/order/order-detail';
import ProfileDetail from '@screens/profile/profile-detail';
import {CartProvider} from '@data/cart-context';
import {RegionProvider} from '@data/region-context';
import {CustomerProvider} from '@data/customer-context';
import AddressForm from '@screens/address/address-form';
import AddressList from '@screens/address/address-list';
import RegionSelect from '@screens/region-select';

import '@styles/global.css';

import {GestureHandlerRootView } from 'react-native-gesture-handler'

import { Slot } from 'expo-router'


const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider name="default">
      <RegionProvider>
        <CartProvider>
          <CustomerProvider>
            <QueryClientProvider client={queryClient}>
              <GestureHandlerRootView style={{flex:1}}>
                <Slot/>
              </GestureHandlerRootView>
            </QueryClientProvider>
          </CustomerProvider>
        </CartProvider>
      </RegionProvider>
    </ThemeProvider>
  );
}


