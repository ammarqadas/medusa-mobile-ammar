import {
  View,
  ScrollView,
  Alert,
} from "react-native";
import { useCart } from "../data/cart-context";
import { useCustomer } from "../data/customer-context";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import