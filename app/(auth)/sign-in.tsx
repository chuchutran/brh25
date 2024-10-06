import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import { useState } from "react";
import { Link, router, Href } from "expo-router";
// import { ThemedText } from '@/components/ThemedText';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { StatusBar } from 'react-native';
import { signIn } from "../../lib/appwrite";
import { ThemedText } from '@/components/ThemedText';
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
    // <SafeAreaView>
    //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    //     <View className='w-full justify-center min-h-[82vh] px-4 my-6'>
    //       <Image source={mooDengImage} resizeMode='contain' className="w-[115px] h-[35px]" />

    //       <Text className='text-2xl text-white font-semibold mt-10 font-psemibold'>
    //         Log in to Moo Deng
    //       </Text>

    // <FormField
    //   title="Email"
    //   value={form.email}
    //   placeholder="Enter your email"
    //   handleChangeText={(e) => setForm({ ...form, email: e })}
    //   otherStyles="mt-7"
    //   keyboardType="email-address"
    // />

    // <FormField
    //   title="Password"
    //   value={form.password}
    //   placeholder="Enter your password"
    //   handleChangeText={(e) => setForm({ ...form, password: e })}
    //   otherStyles="mt-7"
    //   secureTextEntry
    // />

    // <CustomButton
    //   title="Sign In"
    //   handlePress={submit}
    //   containerStyles="mt-7"
    //   isLoading={isSubmitting}
    // // disabled={isSubmitting}  // Disable button when submitting
    // />

    // <View className="flex justify-center pt-5 flex-row gap-2">
    //   <Text className="text-lg text-gray-100 font-pregular">
    //     Don't have an account?
    //   </Text>
    //   <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
    //     Sign up
    //   </Link>
    // </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
      <View className="bg-primary w-full pt-10 pb-10 items-center">
        {/* Circular Profile Image + Name */}
        <View className="w-full items-center mt-20">
          <Image
            source={mooDengImage}
            className="w-32 h-32 rounded-full border-4 border-white"
            resizeMode="cover"
          />
          <ThemedText type='title' className='font-bold text-white text-3xl pt-2'>Log In</ThemedText>
        </View>
      </View>
      <View className='ml-10 mr-10'>
        <FormField
          title="Email"
          value={form.email}
          placeholder="Enter your email"
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles=""
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          placeholder="Enter your password"
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-2"
          secureTextEntry
        />

        <CustomButton
          title="Sign In"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        // disabled={isSubmitting}  // Disable button when submitting
        />
      </View>

      <View>
        <View className="flex justify-center pt-5 flex-row gap-2">
          <ThemedText className="text-lg">
            Don't have an account?
          </ThemedText>
          <Link href="/sign-up" className="text-lg font-psemibold text-primary">
            Sign up
          </Link>
        </View>
      </View>

    </ScrollView>
  );
}