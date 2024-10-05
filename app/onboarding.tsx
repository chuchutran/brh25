import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { usePermissions } from 'expo-media-library'
import { useCameraPermissions } from 'expo-camera';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { Button, Image } from 'react-native';
import CustomButton from '@/components/CustomButton';

export default function OnboardingScreen() {
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
      router.replace("/(tabs)")
    } else {
      Alert.alert("To continue, please provide permissions in settings")
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permissions is required")
      return false;
    }

    const mediaStatus = await requestMediaLibraryPermission();
    if (!mediaStatus.granted) {
      Alert.alert("Error", "Media permissions is required")
      return false;
    }
    await AsyncStorage.setItem("hasOpened", "true")
    return true;
  }
  const mooDengImage = require('@/assets/images/moo_deng.png');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View className='m-3 px-5'>
          <ThemedText type='title' className='text-6xl'>SmartPantry</ThemedText>
          <ThemedText>Welcome to SmartPantry!</ThemedText>
          <ThemedText>To provide the best experience, this app requires permissions for the following:</ThemedText>

          <ThemedText type="subtitle" className='mt-3'>Camera Permissions </ThemedText>
          <ThemedText>For taking pictures</ThemedText>

          <ThemedText type="subtitle" className='mt-3'>Media Library Permissions </ThemedText>
          <ThemedText>To save/view your images</ThemedText>

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

          <Button title="Continue" onPress={handleContinue} />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}
