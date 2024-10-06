import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { usePermissions } from 'expo-media-library'
import { useCameraPermissions } from 'expo-camera';
import { Alert } from 'react-native';
import { Redirect, router } from 'expo-router';
import { Button } from 'react-native';

import { useGlobalContext } from '@/context/GlobalProvider';

export default function OnboardingScreen() {
  const { loading, isLogged} = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/(tabs)"/>
  
  const [cameraPermissions, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = usePermissions();

  async function handleContinue() {
    const allPermissions = await requestAllPermissions();
    if (allPermissions) {
      if (!isLogged) {
        router.replace("/(auth)/sign-in")
      } else {
        router.replace("/(tabs)");
      }
    } else {
      Alert.alert("To continue, please provide permissions in settings")
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermission();
    console.log('Camera Status:', cameraStatus);
    if (!cameraStatus.granted) {
      Alert.alert("Error", "Camera permissions is required")
      return false;
    }
    const mediaStatus = await requestMediaLibraryPermission();
    console.log('Media Library Status:', mediaStatus);
    if (!mediaStatus.granted) {
      Alert.alert("Error", "Media permissions is required")
      return false;
    }
    return true;
  }
  
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
          <Button title="Continue" onPress={handleContinue} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
