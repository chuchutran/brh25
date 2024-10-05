import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

export default function SignIn() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <Text className='text-6xl'>Sign in Page</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}