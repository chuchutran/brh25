import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider'; // Use the global context

const mooDengImage = require('../../assets/images/moo_deng.png');

export default function Profile() {
  // Use global context to access user session state
  const { user, isLogged, loading } = useGlobalContext();

  // While loading, display a loading message
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // If the user is logged in, show their profile information
  if (isLogged && user) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ height: '100%' }}>
          <View className="w-full justify-center items-center h-full px-4">
            <Image
              source={mooDengImage}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <ThemedText className="text-3xl font-semibold">
              Welcome back, {user.name}!
            </ThemedText>
            <Text>Email: {user.email}</Text>
          </View>

          {/* Sign Out Button */}
          <CustomButton
            title="Sign Out"
            handlePress={async () => {
              await signOut();
              router.replace("/sign-in");  // Redirect to the sign-in screen after sign-out
            }}
            containerStyles="mt-7"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  // If no user is logged in, show the sign-in button
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={mooDengImage}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <ThemedText className="text-3xl font-semibold">
            Welcome to Moo Deng
          </ThemedText>

          {/* Continue with Email button */}
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
