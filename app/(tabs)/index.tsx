import React from 'react';
import { View, Image, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Redirect, router } from 'expo-router';

//images - fix later
import { FloatingActionButton } from '@/components/FloatingActionButton';

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className='flex-1 px-10'>
          <ThemedText className='text-3xl' type='bold'>Pantry</ThemedText>
        </View>



      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
      {/* Floating Action Button */}
      <FloatingActionButton />
    </SafeAreaView>
  );
}
