import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

export default function ShoppingList() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <ThemedText>u can put da shopping lists here</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
