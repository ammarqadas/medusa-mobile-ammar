import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCustomer } from "../../data/customer-context";
import { useRegion } from "../../data/region-context";
import {
  Button,
  Input,
  Loader,
  Text,
} from "../../components/common";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AddressSchema } from "../../types/checkout";
import { Address } from "@medusajs/medusa";
import { useCart } from "../../data/cart-context";

type AddressFormProps = {
  address?: Address;
  onSuccess?: () => void;
};

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onSuccess,
}) => {
  const { customer, addAddress, updateAddress } = useCustomer();
  const { cart } = useCart();
  const { region } = useRegion();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const formSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    address_1: z.string().min(1, "Address is required"),
    address_2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country_code: z.string().min(1, "Country is required"),
    province: z.string().optional(),
    postal_code: z.string().min(1, "Postal code is required"),
    phone: z.string().optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: address?.first_name || customer?.first_name || "",
      last_name: address?.last_name || customer?.last_name || "",
      address_1: address?.address_1 || "",
      address_2: address?.address_2 || "",
      city: address?.city || "",
      country_code: address?.country_code || region?.country_code || "",
      province: address?.province || "",
      postal_code: address?.postal_code || "",
      phone: address?.phone || "",
    },
    mode: "onChange",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: any) => {
      if (address) {
        return updateAddress({
          ...address,
          ...data,
        });
      }

      return addAddress({ ...data });
    },
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      navigation.goBack();
    },
  });

  const onSubmit = (data: any) => {
    mutate({ ...data });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="First Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.first_name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Last Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.last_name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address_1"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.address_1?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="address_2"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Address 2"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              optional
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="City"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.city?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="country_code"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Country Code"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.country_code?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="province"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Province"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              optional
            />
          )}
        />
        <Controller
          control={control}
          name="postal_code"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Postal Code"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.postal_code?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Phone"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              optional
            />
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
        >
          {isLoading ? <Loader /> : "Save"}
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    gap: 16,
  },
});

export default AddressForm;