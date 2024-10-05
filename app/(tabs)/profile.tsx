import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';

export default function Profile() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <ThemedText className='text-6xl'>Profile Page</ThemedText>
          <ThemedText >Dis is the profile</ThemedText>
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
