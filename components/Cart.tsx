import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons'; // Icon for the checkbox

// Define the props for Cart
interface CartProps {
  produce: string[];
  setProduce: Dispatch<SetStateAction<string[]>>;
}

export default function Cart({ produce, setProduce }: CartProps) {
  // State to track selected items
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Function to handle item selection
  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(prevItems => prevItems.filter(i => i !== item));
    } else {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-10">
      <View className="flex-1 px-10">
        <ThemedText className="text-3xl mt-6 mb-6" type="bold">
          Cart
        </ThemedText>

        {/* Map through produce array to display each food item with checkbox */}
        {produce.map((food, index) => {
          const isSelected = selectedItems.includes(food);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSelection(food)}
              style={styles.itemContainer}
            >
              {/* Checkbox Icon */}
              <Ionicons
                name={isSelected ? 'checkbox' : 'square-outline'}
                size={24}
                color={isSelected ? 'green' : 'gray'}
              />

              {/* Item Text with conditional strikethrough */}
              <Text
                style={[
                  styles.itemText,
                  isSelected && { textDecorationLine: 'line-through', color: 'gray' }
                ]}
              >
                {food}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});
