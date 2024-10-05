import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <ThemedText>Dis is the profile</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
