import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { CameraView } from 'expo-camera';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';
import MainRowActions from '@/components/MainRowActions';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ThemedText } from '@/components/ThemedText';

export default function Scan() {
  const cameraRef = React.useRef<CameraView>(null);
  const router = useRouter();
  const { source } = useLocalSearchParams();
  const [picture, setPicture] = React.useState<string>("");
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState<boolean>(false);

  // Request media library permissions when the component mounts
  React.useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === 'granted');
    })();
  }, []);

  // Function to take a picture and save to media library
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    if (response?.uri) {
      setPicture(response.uri);

      // Save the picture to the media library if permission is granted
      if (hasMediaLibraryPermission) {
        await MediaLibrary.saveToLibraryAsync(response.uri);
        alert('Picture saved to media library!');
      } else {
        alert('Permission to access media library is required.');
      }
    }
  }

  return (
    <View className="flex-1 bg-black">
      {/* Row container for Back Button and Scan Receipt Text */}
      <View className="relative mt-12 mx-4">


        {/* Scan Receipt Text */}
        <ThemedText className='text-white text-3xl mt-3 text-center' type="bold">
          Scan Receipt
        </ThemedText>
      </View>

      {/* Camera View */}
      <View className="flex-1 mt-8 mb-52 mx-4 rounded-3xl overflow-hidden">
        <CameraView ref={cameraRef} className="flex-1" />
      </View>

      {/* Action Buttons */}
      <MainRowActions handleTakePicture={handleTakePicture} />
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()} // Navigate back
        className="absolute left-0 ml-5 mt-16 rounded-md"
      >
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
