import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { FloatingActionButton } from '@/components/FloatingActionButton';

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <Text className='text-6xl'>Inventory Page</Text>

        </View>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </ScrollView>
    </SafeAreaView>
  );
}
