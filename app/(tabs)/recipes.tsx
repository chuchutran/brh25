import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useCameraPermissions } from 'expo-camera';
import { Link, Stack } from "expo-router";

export default function Recipes() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#yourColor' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex items-center justify-center'>
          <ThemedText className='text-6xl'>Recipes Page</ThemedText>
          <ThemedText>deez are da recipes</ThemedText>
          {/* <Text className='text-4xl'>Camera???</Text>
          <View style={{ gap: 20 }}>
            <Pressable onPress={requestPermission} className='mt-4 px-4 py-2 bg-blue-500 rounded'>
              <Text >Request Permissions</Text>
            </Pressable>
            <Link href={"/scanner"} asChild className='mt-4 px-4 py-2 bg-blue-500 rounded'>
              <Pressable disabled={!isPermissionGranted}>
                <Text
                >
                  Scan Code
                </Text>
              </Pressable>
            </Link>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}