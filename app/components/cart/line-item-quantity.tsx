import React from 'react';
import {useColors} from '@styles/hooks';
import {ActivityIndicator, View} from 'react-native';
import Icon from '@react-native-vector-icons/ant-design';
import Text from '@components/common/text';
import {useCart} from '@data/cart-context';

type LineItemQuantityProps = {
  quantity: number;
  lineItemId: string;
  mode: 'checkout' | 'cart';
};

const LineItemQuantity = ({
  quantity,
  lineItemId,
  mode,
}: LineItemQuantityProps) => {
  const colors = useColors();
  const {updateLineItem} = useCart();
  const [updating, setUpdating] = React.useState(false);

  const increment = async () => {
    const newQuantity = quantity + 1;
    return updateQuantity(newQuantity);
  };

  const decrement = async () => {
    const newQuantity = quantity - 1;
    return updateQuantity(newQuantity);
  };

  const deleteLineItem = async () => {
    setUpdating(true);
    await updateLineItem(lineItemId, 0);
    setUpdating(false);
  };

  const updateQuantity = async (newQuantity: number) => {
    setUpdating(true);
    await updateLineItem(lineItemId, newQuantity);
    setUpdating(false);
  };

  return (
    <View className="flex-row items-center gap-4">
      {mode === 'cart' ? (
        <View className="flex flex-row gap-2 bg-background border-hairline border-primary rounded-lg self-start p-1 items-center">
          <Icon.Button
            onPress={decrement}
            name="minus"
            size={12}
            color={colors.primary}
            backgroundColor="transparent" />
          <Text className="text-base">{quantity}</Text>
          <Icon.Button
            onPress={increment}
            name="plus" size={12} color={colors.primary} backgroundColor="transparent"/>
        </View>
      ) : (
        <Text className="text-base">Qty: {quantity}</Text>
      )}
      {updating ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : mode === 'cart' ? (
        <Icon.Button
        onPress={deleteLineItem}
        name="delete" size={16} color={colors.content}
        backgroundColor="transparent"
        />
      ) : null}
    </View>
  );
};

export default LineItemQuantity;
