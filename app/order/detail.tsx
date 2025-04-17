import { useNavigation, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { useQuery } from "@tanstack/react-query"
import React, { useCallback, useMemo } from "react"
import { ActivityIndicator, Alert, ScrollView, View } from "react-native"
import {
  Accordion,
  Button,
  Card,
  ErrorUI,
  Loader,
  Navbar,
  Text,
} from "../../components/common"
import { CustomerContext } from "../../data/customer-context"
import { Order } from "../../types/order"
import { formatCurrency, formatDateTime } from "../../utils/common"
import { client } from "../api/client"

type OrderDetailParams = {
  id: string
}

type Props = StackScreenProps<any, "OrderDetail">

const OrderDetail = ({}: Props) => {
  const navigation = useNavigation()
  const route = useRoute()

  const { id } = route.params as OrderDetailParams

  const { data, isLoading, error, refetch } = useQuery(
    ["order", id],
    async () => {
      const response = await client.orders.retrieve(id, {
        expand: "shipping_address,billing_address,items.variant",
      })
      return response.order
    },
    {
      enabled: !!id,
    }
  )

  const customerContext = React.useContext(CustomerContext)

  const handleLogout = useCallback(async () => {
    await customerContext.logout()
    navigation.navigate("Splash")
  }, [customerContext, navigation])

  const handlePressLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: handleLogout,
      },
    ])
  }, [handleLogout])

  const handlePressRetry = useCallback(() => {
    refetch()
  }, [refetch])

  const productPrice = useMemo(() => {
    if (!data) {
      return null
    }

    const totalPrice = data.items.reduce(
      (acc, curr) => acc + curr.quantity * (curr.unit_price || 0),
      0
    )

    return formatCurrency({ amount: totalPrice, currency: data.currency_code })
  }, [data])

  if (isLoading) {
    return <Loader />
  }

  if (error || !data) {
    return (
      <ErrorUI
        onRetry={handlePressRetry}
        error={error}
        errorMessage="Failed to load order"
      />
    )
  }

  return (
    <View className="flex-1 bg-white">
      <Navbar
        title="Order detail"
        rightAction={
          <Button onPress={handlePressLogout} variant="link">
            Logout
          </Button>
        }
      />
      <ScrollView className="flex-1 px-4 py-4">
        <View className="space-y-2">
          <Text className="text-2xl font-bold">
            Order number: {data.display_id}
          </Text>
          <Text className="text-sm">
            Created at: {formatDateTime(data.created_at)}
          </Text>
          <Text className="text-sm">Status: {data.status}</Text>
          <Text className="text-sm">
            Fulfillment status: {data.fulfillment_status}
          </Text>
        </View>
        <View className="mt-4">
          <Accordion title="Items">
            <View className="mt-2 space-y-2">
              {data.items.map((item) => {
                return (
                  <Card key={item.id} className="p-4">
                    <View className="flex-row space-x-4 items-center">
                      <View className="flex-1">
                        <Text className="font-semibold">
                          {item.title} - {item.variant?.title}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </Text>
                      </View>
                      <View>
                        <Text>
                          {formatCurrency({
                            amount: item.quantity * (item.unit_price || 0),
                            currency: data.currency_code,
                          })}
                        </Text>
                      </View>
                    </View>
                  </Card>
                )
              })}
            </View>
          </Accordion>
          {data.shipping_address && (
            <Accordion title="Shipping Address">
              <View className="mt-2 space-y-1">
                <Text className="font-semibold">{data.shipping_address.first_name} {data.shipping_address.last_name}</Text>
                <Text>{data.shipping_address.address_1}</Text>
                {data.shipping_address.address_2 && (
                  <Text>{data.shipping_address.address_2}</Text>
                )}
                <Text>
                  {data.shipping_address.postal_code} {data.shipping_address.city}, {data.shipping_address.country_code.toUpperCase()}
                </Text>
              </View>
            </Accordion>
          )}
          {data.billing_address && (
            <Accordion title="Billing Address">
              <View className="mt-2 space-y-1">
                <Text className="font-semibold">{data.billing_address.first_name} {data.billing_address.last_name}</Text>
                <Text>{data.billing_address.address_1}</Text>
                {data.billing_address.address_2 && (
                  <Text>{data.billing_address.address_2}</Text>
                )}
                <Text>
                  {data.billing_address.postal_code} {data.billing_address.city}, {data.billing_address.country_code.toUpperCase()}
                </Text>
              </View>
            </Accordion>
          )}
          <Accordion title="Payment Summary">
            <View className="mt-2 space-y-1">
              <View className="flex-row justify-between">
                <Text>Product Price</Text>
                <Text>{productPrice}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Shipping Price</Text>
                <Text>
                  {formatCurrency({
                    amount: data.shipping_total || 0,
                    currency: data.currency_code,
                  })}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text>Discount</Text>
                <Text>
                  {formatCurrency({
                    amount: data.discount_total || 0,
                    currency: data.currency_code,
                  })}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="font-bold">Total</Text>
                <Text className="font-bold">
                  {formatCurrency({
                    amount: data.total || 0,
                    currency: data.currency_code,
                  })}
                </Text>
              </View>
            </View>
          </Accordion>
        </View>
      </ScrollView>
    </View>
  )
}

export default OrderDetail