import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';

//images - fix later
const mooDengImage = require('../../assets/images/moo_deng.png');

export default function Inventory() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image 
            source={mooDengImage} 
            className="w-[130px] h-[84px]" 
            resizeMode="contain"
            />
          <ThemedText className="text-3xl font-semibold">Welcome to Moo Deng</ThemedText>
          
          {/* Contine with Email button */}
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
}
