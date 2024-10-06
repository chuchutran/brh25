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
          <ThemedText type='title' className='text-5xl mb-5' type="bold">SmartPantry</ThemedText>
          <ThemedText className='text-xl'>Welcome to SmartPantry!</ThemedText>
          <ThemedText className='text-xl'>To provide the best experience, this app requires permissions for the following:</ThemedText>

          <ThemedText type="subtitle" className='mt-3 text-xl' type='bold'>Camera Permissions </ThemedText>
          <ThemedText className='text-xl'>For taking pictures</ThemedText>

          <ThemedText type="subtitle" className='mt-3 text-xl ' type='bold'>Media Library Permissions </ThemedText>
          <ThemedText className='text-xl'>To save/view your images</ThemedText>




          <Button title="Continue" onPress={handleContinue} />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}
