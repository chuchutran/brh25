import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center">
          <ThemedText className="text-xl font-semibold">Hello World</ThemedText>

          {/* Sign In Button */}
          <Link href="/(auth)/sign-in" className="mt-4 px-4 py-2 bg-blue-500 rounded">
            <ThemedText className="text-white">Sign In</ThemedText>
          </Link>

          {/* Sign Up Button */}
          <Link href="/(auth)/sign-up" className="mt-2 px-4 py-2 bg-green-500 rounded">
            <ThemedText className="text-white">Sign Up</ThemedText>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
