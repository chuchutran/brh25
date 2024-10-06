// SignUp.tsx

import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { createUser } from "../../lib/appwrite"; // Import the createUser function

// Image import
const mooDengImage = require('../../assets/images/moo_deng.png');

interface FormState {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (): Promise<void> => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.name);
      router.replace('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center min-h-[82vh] px-4 my-6">
          <Image source={mooDengImage} resizeMode="contain" className="w-[115px] h-[35px]" />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up for Moo Deng
          </Text>

          <FormField
            title="First Name"
            value={form.name}
            placeholder="Enter your first name"
            handleChangeText={(e: string) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry={true}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
