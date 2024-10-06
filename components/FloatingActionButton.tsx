import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use any icon library

export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className='absolute bottom-5 right-5 items-end'>
      {isExpanded && (
        <View className='mb-4 self-end'>
          {/* Option 1: Scan Receipt */}
          <TouchableOpacity className='bg-primary px-4 py-2 rounded-full mb-2 flex-row-reverse items-center justify-center'>
            <FontAwesome name="camera" size={24} color="white" />
            <Text className='text-white mr-2'>Scan Receipt</Text>
          </TouchableOpacity>

          {/* Option 2: Search Item */}
          <TouchableOpacity className='bg-primary px-4 py-2 rounded-full mb-2 flex-row-reverse items-center justify-center'>
            <FontAwesome name="search" size={24} color="white" />
            <Text className='text-white mr-2'>Search Item</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Floating Action Button */}
      <TouchableOpacity
        className='bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg'
        onPress={toggleMenu}
      >
        <FontAwesome name={isExpanded ? "times" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
