import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router'; // Import hooks from expo-router

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter(); // Access the router object
  const segments = useSegments(); // Get the current route segments

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleScanReceipt = () => {
    // Navigate to the Scan screen and pass the current route as "source"
    router.push({
      pathname: "/scan",
      params: { source: segments }, // Pass the source as the current route segments
    });
  };

  const handleSearch = () => {
    // Navigate to the Scan screen and pass the current route as "source"
    router.push({
      pathname: "/search",
      params: { source: segments }, // Pass the source as the current route segments

    });
  };

  // Log or use the current page/route
  // console.log('Current page/route:', segments);

  return (
    <View className='absolute bottom-5 right-5 items-end'>
      {isExpanded && (
        <View className='mb-4 items-end'>
          {/* Option 1: Scan Receipt */}
          <TouchableOpacity
            className='bg-primary px-4 py-2 rounded-full mb-2 flex-row-reverse items-center justify-center'
            onPress={handleScanReceipt}
          >
            <FontAwesome name="camera" size={24} color="white" />
            <Text className='text-white mr-2'>Scan Receipt</Text>
          </TouchableOpacity>

          {/* Option 2: Search Item */}
          <TouchableOpacity className='bg-primary px-4 py-2 rounded-full flex-row-reverse items-center justify-center'
            onPress={handleSearch}>
            <FontAwesome name="search" size={24} color="white" />
            <Text className='text-white mr-2'>Search Item</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Floating Action Button */}
      <TouchableOpacity
        className='bg-[#16A34A] w-16 h-16 rounded-full flex items-center justify-center shadow-lg'
        onPress={toggleMenu}
      >
        <FontAwesome name={isExpanded ? "times" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
