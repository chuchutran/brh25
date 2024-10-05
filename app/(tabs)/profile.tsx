import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

export default function Profile() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <Text className='text-6xl'>Profile Page</Text>
          <ThemedText >Dis is the profile</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
