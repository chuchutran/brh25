import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons'; // Icon for the checkbox
import { FloatingActionButton } from '@/components/FloatingActionButton';
import Cart from '@/components/Cart';
interface ShoppingListProps {
  produce: string[];
  setProduce: Dispatch<SetStateAction<string[]>>;
}

export default function ShoppingList() {
  const [produce, setProduce] = useState<string[]>(["Banana", "Cheddar Cheese", "Carrot", "Rice", "Spinach", "Whole Milk"]);

  // Function to add an item to the shopping list
  const addItemToList = (item: string) => {
    if (!produce.includes(item)) {
      setProduce([...produce, item]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Cart produce={produce} setProduce={setProduce} />
      <FloatingActionButton addItemToList={addItemToList} />
    </View>
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
