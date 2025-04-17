import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Text, Input, Button } from "../../components/common";
import { useCustomer } from "../../data/customer-context";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = yup.InferType<typeof loginSchema>;

export default function LoginScreen() {
  const { login } = useCustomer();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await login(data);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text type="heading" className="mb-4">
        Login
      </Text>
      <Input
        control={control}
        name="email"
        placeholder="Email"
        error={errors.email?.message}
      />
      <Input
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
        error={errors.password?.message}
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
      >
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});