import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useState } from "react";
import { Link, router, Href } from "expo-router";
// import { ThemedText } from '@/components/ThemedText';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

import { signIn } from "../../lib/appwrite";

//images - fix later
const mooDengImage = require('../../assets/images/moo_deng.png');


export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
      return;  // Return early if fields are empty
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      // redirect to main page
      router.replace('/(tabs)/' as Href<'/(tabs)/'>);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='w-full justify-center min-h-[82vh] px-4 my-6'>
          <Image source={mooDengImage} resizeMode='contain' className="w-[115px] h-[35px]" />

          <Text className='text-2xl text-white font-semibold mt-10 font-psemibold'>
            Log in to Moo Deng
          </Text>

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          // disabled={isSubmitting}  // Disable button when submitting
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}