import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useState } from "react";
import { Link } from "expo-router";
// import { ThemedText } from '@/components/ThemedText';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';

//images - fix later
const mooDengImage = require('../../assets/images/moo_deng.png');

export default function SignUp() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {

  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='w-full justify-center min-h-[82vh] px-4 my-6'>
          <Image source={mooDengImage} resizeMode='contain' className="w-[115px] h-[35px]" />

          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Sign up for Moo Deng</Text>

          <FormField 
            title="First Name"
            value={form.name}
            placeholder='Enter your first name'
            handleChangeText={(e) => setForm({ ...form, name: e})}
            otherStyles="mt-10"
          />

          <FormField 
            title="Email"
            value={form.email}
            placeholder='Enter your email'
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            placeholder='Enter your password'
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-7"
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
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}