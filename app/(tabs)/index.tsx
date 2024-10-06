import React from 'react';
import { View, Image, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { FloatingActionButton } from '@/components/FloatingActionButton';

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>

        {/* Floating Action Button */}
        <FloatingActionButton />
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
}
