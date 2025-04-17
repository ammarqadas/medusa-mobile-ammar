import React, { useCallback, useContext, useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"

import { Button } from "../../components/common/button"
import { CustomerContext } from "../../data/customer-context"
import { ErrorUI } from "../../components/common/error-ui"
import { Loader } from "../../components/common/loader"
import { Text } from "../../components/common/text"
import { Address } from "../../types/customer"
import { useAddresses } from "../../data/hooks"
import { useTheme } from "../../styles/theme-provider"
import { getErrorMessage } from "../../utils/common"
import { useRouter } from "expo-router"

const AddressList = () => {
  const { colors, layout, typography } = useTheme()
  const router = useRouter()
  const { customer } = useContext(CustomerContext)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const { fetchAddresses } = useAddresses()

  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
        .then((data) => {
          setAddresses(data || [])
          setError(null)
        })
        .catch((err) => {
          setError(getErrorMessage(err))
        })
        .finally(() => {
          setLoading(false)
        })
    }, [])
  )

  useEffect(() => {
    if (customer?.addresses) {
      setAddresses(customer.addresses)
    }
  }, [customer?.addresses])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <ErrorUI
        message={error}
        onRetry={() => {
          setLoading(true)
          fetchAddresses()
            .then((data) => {
              setAddresses(data || [])
              setError(null)
            })
            .catch((err) => {
              setError(getErrorMessage(err))
            })
            .finally(() => {
              setLoading(false)
            })
        }}
      />
    )
  }

  return (
    <View style={[layout.screenContainer, { paddingHorizontal: 20 }]}>
      <View style={[layout.topContentContainer, { paddingBottom: 20 }]}>
        <Text preset="heading" style={{ marginBottom: 20 }}>
          My addresses
        </Text>
        <Text preset="small">
          Manage your saved addresses, add or edit your addresses here.
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {addresses?.length ? (
          addresses.map((address) => {
            return (
              <View
                key={address.id}
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  padding: 20,
                  marginBottom: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Text
                    preset="bold"
                    style={[
                      { marginRight: 10 },
                      typography.h4,
                      { flex: 1 },
                    ]}
                  >
                    {address.first_name} {address.last_name}
                  </Text>
                </View>

                <Text style={[{ marginBottom: 5 }]}>
                  {address.address_1}
                  {address.address_2 ? `, ${address.address_2}` : null}
                </Text>
                <Text style={[{ marginBottom: 5 }]}>
                  {address.city} {address.province}
                </Text>
                <Text style={[{ marginBottom: 5 }]}>
                  {address.postal_code} {address.country_code?.toUpperCase()}
                </Text>
                <Text style={[{ marginBottom: 5 }]}>{address.phone}</Text>
              </View>
            )
          })
        ) : (
          <Text>No saved addresses</Text>
        )}
      </ScrollView>
      <Button onPress={() => router.push("/address/form")}>
        Add new address
      </Button>
    </View>
  )
}

export default AddressList