import { useCustomer } from "../../data/customer-context"
import { Button } from "../../components/common/button"
import { Text } from "../../components/common/text"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/navigation"

const ProfileScreen = () => {
  const { customer, setCustomer } = useCustomer()
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const handleLogout = () => {
    setCustomer(null)
  }

  const handleGoToDetails = () => {
    navigation.navigate("ProfileDetail")
  }

  return (
    <View className="p-6 flex-1 justify-center items-center">
      {customer ? (
        <>
          <Text>Logged in as: {customer.email}</Text>
          <Button onPress={handleLogout} title="Logout" />
          <Button onPress={handleGoToDetails} title="Profile Details" />
        </>
      ) : (
        <Text>Not logged in</Text>
      )}
    </View>
  )
}

export default ProfileScreen