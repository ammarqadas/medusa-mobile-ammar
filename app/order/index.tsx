import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useContext, useState } from "react"
import { ScrollView, View } from "react-native"

import { Text } from "../../components/common/text"
import { CustomerContext } from "../../data/customer-context"
import { OrderContext } from "../../data/order-context"
import { useOrder } from "../../data/hooks"
import { Order } from "../../types/order"

export default function Orders() {
  const { customer } = useContext(CustomerContext)
  const { orders, setOrders } = useContext(OrderContext)
  const { listOrders } = useOrder()
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = useCallback(async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    try {
      if (customer?.id) {
        const newOrders = await listOrders(customer.id)
        setOrders(newOrders)
      }
    } finally {
      setIsLoading(false)
    }
  }, [customer?.id, listOrders, setIsLoading, setOrders])

  useFocusEffect(fetchOrders)

  return (
    <ScrollView>
      <View>
        {orders?.map((order: Order) => (
          <Text key={order.id}>{order.id}</Text>
        ))}
      </View>
    </ScrollView>
  )
}