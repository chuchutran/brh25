import React from 'react';
import { Image, Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <ThemedText>Hello World</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
