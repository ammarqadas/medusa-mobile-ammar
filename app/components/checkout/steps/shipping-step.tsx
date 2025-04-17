import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from '@components/common/text';
import {Controller, UseFormReturn} from 'react-hook-form';
import {CheckoutFormData} from '../../../../types/checkout';
import {Region} from '@medusajs/medusa';
import {useCustomer} from '@data/customer-context';
import {useRegion} from '@data/region-context';
import {formatPrice} from '@utils/product-price';
import {ShippingOption} from '@medusajs/medusa/dist/models/shipping-option';
import {useCart} from '@data/cart-context';

type ShippingStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  isLoading: boolean;
  onShippingSelect: (shippingOption: ShippingOption) => void;
};

const ShippingStep = ({
  form,
  isLoading,
  onShippingSelect,
}: ShippingStepProps) => {
  const {watch, setValue} = form;
  const region = useRegion();
  const {customer} = useCustomer();
  const {cart} = useCart();
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(
    null,
  );

  const shippingAddress = watch('shipping_address');

  useEffect(() => {
    if (selectedShipping) {
      onShippingSelect(selectedShipping);
    }
  }, [selectedShipping]);

  const formattedShippingOptions = region?.shipping_options.map(option => {
    return {
      ...option,
      formattedAmount: formatPrice({
        amount: option.amount,
        currencyCode: region?.currency_code,
      }),
    };
  });

  if (!formattedShippingOptions?.length) {
    return (
      <View>
        <Text className="mb-4">No shipping options available.</Text>
      </View>
    );
  }

  if (!shippingAddress?.country_code) {
    return (
      <View>
        <Text className="mb-4">Please select a shipping address</Text>
      </View>
    );
  }

  return (
    <View className="space-y-4">
      {formattedShippingOptions?.map(option => (
        <TouchableOpacity
          key={option.id}
          onPress={() => {
            setSelectedShipping(option);
          }}
          className={`p-4 border ${
            option.id === selectedShipping?.id
              ? 'border-indigo-600'
              : 'border-gray-200'
          } rounded-lg`}>
          <View className="flex-row justify-between items-center">
            <Text className="font-bold">{option.name}</Text>
            <Text className="text-gray-600">{option.formattedAmount}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ShippingStep;