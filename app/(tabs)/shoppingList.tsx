import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { FloatingActionButton } from '@/components/FloatingActionButton';

export default function ShoppingList() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <Text className='text-6xl'>Shopping Lists</Text>
          <ThemedText>u can put da shopping lists here</ThemedText>
        </View>
        {/* Floating Action Button */}
        <FloatingActionButton />
      </ScrollView>
    </SafeAreaView>
  );
}
