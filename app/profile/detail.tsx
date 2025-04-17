import React, { useCallback, useContext, useState } from "react";
import { View, Alert, ScrollView } from "react-native";

import { Button } from "../../components/common/button";
import { Text } from "../../components/common/text";
import { Input } from "../../components/common/input";
import { CustomerContext } from "../../data/customer-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

type ProfileDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileDetail"
>;

export const ProfileDetail = ({ navigation }: ProfileDetailScreenProps) => {
  const { customer, setCustomer } = useContext(CustomerContext);
  const [email, setEmail] = useState<string>(customer?.email ?? "");
  const [firstName, setFirstName] = useState<string>(
    customer?.first_name ?? ""
  );
  const [lastName, setLastName] = useState<string>(customer?.last_name ?? "");
  const [phone, setPhone] = useState<string>(customer?.phone ?? "");

  const handleSaveProfile = useCallback(async () => {
    if (!customer) {
      return;
    }

    try {
      setCustomer({
        ...customer,
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
      });

      Alert.alert("Profile updated!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  }, [customer, email, firstName, lastName, phone, setCustomer, navigation]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 24 }}>
          <Text variant="heading">Edit Profile</Text>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input label="First Name" value={firstName} onChangeText={setFirstName} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input label="Last Name" value={lastName} onChangeText={setLastName} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Input label="Phone" value={phone} onChangeText={setPhone} />
        </View>
        <View style={{ marginTop: "auto" }}>
          <Button onPress={handleSaveProfile}>Save</Button>
        </View>
      </View>
    </ScrollView>
  );
};