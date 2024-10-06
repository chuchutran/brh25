import React, { useState } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router'; // Import hooks from expo-router

export function ScanButton() {
  const router = useRouter(); // Access the router object
  const segments = useSegments(); // Get the current route segments

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);

  // Determine if the current route is "shoppingList"
  const isOnShoppingList = segments[segments.length - 1] === 'shoppingList';

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    setShowInput(false);
    setSearchTerm(''); // Reset search term when the menu is toggled
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
    });
  };



  return (
    <View style={{ position: 'absolute', bottom: 20, right: 20, alignItems: 'flex-end' }}>
      {isExpanded && (
        <View style={{ marginBottom: 10, alignItems: 'flex-end' }}>
          {/* Option 1: Scan Receipt */}
          <TouchableOpacity
            style={{
              backgroundColor: '#16A34A',
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
            onPress={handleScanReceipt}
          >
            <FontAwesome name="camera" size={24} color="white" />
            <Text style={{ color: 'white', marginLeft: 8 }}>Scan Receipt</Text>
          </TouchableOpacity>


        </View>
      )}

      {/* Main Floating Action Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#16A34A',
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowOpacity: 0.5,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }}
        onPress={toggleMenu}
      >
        <FontAwesome name={isExpanded ? "times" : "plus"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}