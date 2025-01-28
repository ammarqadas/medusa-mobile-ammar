import * as React from 'react';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ThemeProvider from '@styles/theme-provider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Splash from '@screens/splash';
import Home from '@screens/home';

import '@styles/global.css';
import ProductScreen from '@screens/product-detail';

export type RootStackParamList = StaticParamList<typeof RootStack>;

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider name="default">
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <Navigation />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Splash: {
      screen: Splash,
      options: {
        headerShown: false,
      },
    },
    Home,
    ProductScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);
