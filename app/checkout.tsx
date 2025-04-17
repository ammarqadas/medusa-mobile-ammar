import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Alert } from "react-native";

import { CartContext } from "../data/cart-context";
import { CustomerContext } from "../data/customer-context";
import { RegionContext } from "../data/region-context";
import {
  CheckoutSteps,
  AddressStep,
  ShippingStep,
  PaymentStep,
  ReviewStep,
} from "../components/checkout";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button, Loader, Text } from "../components/common";
import { useTheme } from "../styles/theme-provider";
import { Customer, LineItem } from "@medusajs/medusa";
import {
  ShippingMethod,
  PaymentSession,
} from "../types/checkout";
import { createOrder, updateCart } from "../utils/order";

enum CheckoutStep {
  Address = 0,
  Shipping,
  Payment,
  Review,
  Complete,
}

const CheckoutScreen = () => {
  const { colors, spacing } = useTheme();
  const { cart, fetchCart, updateCartItems, clearCart } =
    useContext(CartContext);
  const { fetchCustomer } = useContext(CustomerContext);
  const { region, fetchRegion } = useContext(RegionContext);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);
  const [paymentSession, setPaymentSession] =
    useState<PaymentSession | null>(null);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(
    CheckoutStep.Address
  );
  const [cartUpdating, setCartUpdating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCustomerLoading, setIsCustomerLoading] = useState(false);
  const [isRegionLoading, setIsRegionLoading] = useState(false);
  const [hasBeenMounted, setHasBeenMounted] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    if (!hasBeenMounted) {
      fetchData();
      setHasBeenMounted(true);
    }
    if (isFocused) {
      setCartUpdating(true);
      fetchCart().finally(() => setCartUpdating(false));
    }
  }, [isFocused, hasBeenMounted]);

  useEffect(() => {
    if (region && region.id) {
      setSelectedShippingMethod(null);
      setPaymentSession(null);
    }
  }, [region]);

  useEffect(() => {
    if (cart) {
      const currentItems = cart?.items || [];
      const needsUpdate =
        currentItems.length > 0 &&
        currentItems.every(
          (li: LineItem) => li.quantity === 0
        );

      if (needsUpdate) {
        clearCart();
      }
    }
  }, [cart]);

  const fetchData = async () => {
    setLoading(true);
    try {
      setIsCustomerLoading(true);
      const customer = await fetchCustomer();
      setCustomer(customer);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCustomerLoading(false);
    }
    try {
      setIsRegionLoading(true);
      await fetchRegion();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegionLoading(false);
    }
    setLoading(false);
  };

  const updateCartCustomer = async (
    customer_id: string,
    email: string
  ) => {
    try {
      setCartUpdating(true);
      await updateCart({ customer_id, email });
      await fetchCart();
    } catch (error) {
      console.error(error);
    } finally {
      setCartUpdating(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const handleCheckout = async () => {
    if (!cart) {
      return;
    }
    try {
      const order = await createOrder({
        cart_id: cart.id,
      });
      clearCart();
      setCurrentStep(CheckoutStep.Complete);
    } catch (error) {
      Alert.alert("Error", "Could not complete the order");
      console.error(error);
    }
  };

  if (loading || isCustomerLoading || isRegionLoading || !cart || cartUpdating) {
    return <Loader />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.large,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={{ marginTop: spacing.large }}>
        <CheckoutSteps currentStep={currentStep} />
        {currentStep === CheckoutStep.Address && (
          <AddressStep
            updateCartCustomer={updateCartCustomer}
            nextStep={nextStep}
            customer={customer}
          />
        )}
        {currentStep === CheckoutStep.Shipping && (
          <ShippingStep
            previousStep={previousStep}
            nextStep={nextStep}
            setSelectedShippingMethod={setSelectedShippingMethod}
          />
        )}
        {currentStep === CheckoutStep.Payment && (
          <PaymentStep
            previousStep={previousStep}
            nextStep={nextStep}
            setPaymentSession={setPaymentSession}
          />
        )}
        {currentStep === CheckoutStep.Review && (
          <ReviewStep
            paymentSession={paymentSession}
            selectedShippingMethod={selectedShippingMethod}
            previousStep={previousStep}
            handleCheckout={handleCheckout}
          />
        )}

        {currentStep === CheckoutStep.Complete && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Your order has been placed!</Text>
            <Button
              label="Go to Orders"
              onPress={() => {
                navigation.navigate("Orders");
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;