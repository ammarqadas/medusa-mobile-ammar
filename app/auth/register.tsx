import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../components/common/text";
import { Input } from "../../components/common/input";
import { Button } from "../../components/common/button";
import { useRouter } from "expo-router";
import { useCustomer } from "../../data/customer-context";

const RegisterScreen = () => {
  const router = useRouter();
  const { register } = useCustomer();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text preset="heading">Register</Text>
      <Input
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={handleRegister}>Register</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});

export default RegisterScreen;