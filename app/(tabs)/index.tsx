import React, { useState } from 'react';
import { View, Image, StatusBar, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { FloatingActionButton } from '@/components/FloatingActionButton';

// Defining the categories as an enum
enum Category {
  PRODUCE = 'produce',
  PROTEIN = 'protein',
  DAIRY = 'dairy',
  CARBS = 'carbs'
}

// Defining the type for pantry items
type PantryItem = {
  id: number;
  name: string;
  expiration: string;
  category: Category;
  imageURL: string; // New field for the image URL
};

// Sample data representing food items in the pantry
const pantryData: PantryItem[] = [
  { id: 1, name: 'Bell Pepper', expiration: '10-15-2024', category: Category.PRODUCE, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024997002395b8cb2d/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin'},
  { id: 2, name: 'Avocado', expiration: '10-18-2024', category: Category.PRODUCE, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024efd002a27528391/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin'},
  { id: 3, name: 'Chicken Breast', expiration: '10-20-2024', category: Category.PROTEIN, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024d2d002beed475cd/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin' },
  { id: 4, name: 'Egg', expiration: '10-25-2024', category: Category.PROTEIN, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/670245a8002663da2c4a/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin' },
  { id: 5, name: 'Milk', expiration: '10-12-2024', category: Category.DAIRY, imageURL: 'https://s3.amazonaws.com/grocery-project/product_images/great-value-milk-vitamin-d-w-286412-10385811.jpg' },
  { id: 6, name: 'Cheese', expiration: '11-01-2024', category: Category.DAIRY, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024920001f555921c2/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin' },
  { id: 7, name: 'Bread', expiration: '10-14-2024', category: Category.CARBS, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024cd7002e2d56f792/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin' },
  { id: 8, name: 'Pasta', expiration: '1-10-2024', category: Category.CARBS, imageURL: 'https://cloud.appwrite.io/v1/storage/buckets/67023e99000bf4cd60ac/files/67024ec80006daecc225/view?project=67019cc8000585284e38&project=67019cc8000585284e38&mode=admin' }
];

// Categories to loop through
const categories: { title: string, category: Category }[] = [
  { title: 'PRODUCE', category: Category.PRODUCE },
  { title: 'PROTEIN', category: Category.PROTEIN },
  { title: 'DAIRY', category: Category.DAIRY },
  { title: 'CARBS', category: Category.CARBS }
];

// Helper function to filter pantry items by category
const getItemsByCategory = (category: Category): PantryItem[] => {
  return pantryData.filter(item => item.category === category);
};


export default function Inventory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PantryItem | null>(null);
  const [newShelfLife, setNewShelfLife] = useState<string>('');
  const [newExpirationDate, setNewExpirationDate] = useState<string>('');
  
  // Handler to open the modal with the selected item
  const handleOpenModal = (item: PantryItem) => {
    setSelectedItem(item);
    setNewShelfLife('');
    setNewExpirationDate('');
    setModalVisible(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View className='flex-1 px-5'>
            <ThemedText className='text-3xl mt-6' type='bold'>Pantry</ThemedText>
          </View>
          <View className="flex-1 p-5 bg-gray-100">
          {categories.map(({ title, category }) => (
            <View key={category} className="mb-6">
              {/* Category Title */}
              <ThemedText type='title' className='font-bold text-lg mb-4 text-[#9CA3AF] uppercase'>{title}</ThemedText>
              {/* Category Items */}
              {getItemsByCategory(category).map((item, index, array) => (
                <View key={item.id}>
                  <TouchableOpacity 
                  className="flex-row items-center justify-between mb-2"
                  onPress={() => handleOpenModal(item)}
                  >
                    {/* Image on the left side */}
                    <View className="flex-row items-center">
                      <Image
                        source={{ uri: item.imageURL }}
                        className="w-10 h-10 mr-4 rounded-md"
                        resizeMode="cover"
                      />
                      <Text className="text-lg text-black">{item.name}</Text>
                    </View>
                    <Text className="text-sm text-gray-500">{item.expiration}</Text>
                  </TouchableOpacity>
                  
                  {/* Add a separator line below, if it is not the last item */}
                  {index < array.length - 1 && (
                    <View className="h-[1px] bg-gray-300 mb-2" />
                  )}
                </View>
              ))}
            </View>
          ))}
          </View>
        </ScrollView>
      <FloatingActionButton />
    </SafeAreaView>
    
  );
}