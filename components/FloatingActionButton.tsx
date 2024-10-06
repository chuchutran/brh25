import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Keyboard, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useSegments } from 'expo-router'; // Import hooks from expo-router

export function FloatingActionButton({ addItemToList }: { addItemToList: (item: string) => void }) {
  const router = useRouter(); // Access the router object
  const segments = useSegments(); // Get the current route segments

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [bottomOffset] = useState(new Animated.Value(20)); // Animated value for FAB position

  // Determine if the current route is "shoppingList"
  const isOnShoppingList = segments[segments.length - 1] === 'shoppingList';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      // Move the FAB up when the keyboard is visible, but limit how high it goes
      if (isOnShoppingList) {
        Animated.timing(bottomOffset, {
          toValue: event.endCoordinates.height - 60, // Subtract 60 or an appropriate offset
          duration: 150, // Keep the animation duration fast (150ms)
          useNativeDriver: false,
        }).start();
      }
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Move the FAB back to its original position when the keyboard is hidden
      if (isOnShoppingList) {
        Animated.timing(bottomOffset, {
          toValue: 20, // Restore the default position
          duration: 150, // Keep the animation duration fast (150ms)
          useNativeDriver: false,
        }).start();
      }
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [bottomOffset, isOnShoppingList]);

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

  const handleAddItem = () => {
    if (searchTerm) {
      addItemToList(searchTerm);
      setSearchTerm(''); // Clear the input after adding
      setShowInput(false); // Hide the input
    }
  };

  return (
    <Animated.View
      style={{
        position: 'absolute',
        right: 20,
        bottom: isOnShoppingList ? bottomOffset : 20, // Absolute positioning based on the route
        alignItems: 'flex-end',
      }}
    >
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

          {/* Only display this option if the current route is "shoppingList" */}
          {isOnShoppingList && (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: '#16A34A',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setShowInput(!showInput)}
              >
                <FontAwesome name="search" size={24} color="white" />
                <Text style={{ color: 'white', marginLeft: 8 }}>Search Item</Text>
              </TouchableOpacity>

              {showInput && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <TextInput
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 5,
                      width: 200,
                      borderWidth: 1,
                      borderColor: 'gray',
                    }}
                    placeholder="Type item to add"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                  />
                  <TouchableOpacity onPress={handleAddItem} style={{ marginLeft: 10 }}>
                    <FontAwesome name="plus-circle" size={24} color="green" />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
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
    </Animated.View>
  );
}
