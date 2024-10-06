import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router'; // Use expo-router
import SearchBar from '@/components/SearchBar';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  const router = useRouter(); // Initialize the router

  return (
    <View className="flex-1">
      <SafeAreaView>
        {/* Row Container for Back Button and Search Bar */}
        <View className="flex-row items-center mx-4">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()} // Navigate back
            className="p-0"
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>

          {/* Search Bar */}
          <View className='flex-1 px-2'>
            <SearchBar />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
