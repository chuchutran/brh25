import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getAllIngredients } from '@/lib/appwrite';

// Defining the type for pantry items
interface Ingredient {
  $id: string;
  name: string;
  expiryDate: string;
  category: string;
  imageUrl: string; 
}

export default function Inventory() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const { user, isLogged, loading } = useGlobalContext();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        if (isLogged) {
          const ingredientsData = await getAllIngredients();
          setIngredients(ingredientsData);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [isLogged]);

  const renderCategorySection = (category: string, categoryName: string) => {
    const items = ingredients.filter((item) => {
      const normalizedCategory = item.category.toLowerCase();
      return (
        normalizedCategory === category ||
        (category === 'carbs' && normalizedCategory === 'carbohydrate') // Handle different naming conventions for Carbs
      );
    });

    if (items.length === 0) return null;

    return (
      <View className="mb-6">
        <ThemedText type="title" className="font-bold text-lg mb-4 text-[#9CA3AF] uppercase">
          {categoryName}
        </ThemedText>
        {items.map((ingredient, index, array) => (
          <View key={ingredient.$id}>
            <TouchableOpacity className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center">
                {ingredient.imageUrl ? (
                  <Image
                    source={{ uri: ingredient.imageUrl }}
                    className="w-10 h-10 mr-4 rounded-md"
                    resizeMode="cover"
                  />
                ) : null}
                <Text className="text-lg text-black">{ingredient.name}</Text>
              </View>
              <Text className="text-sm text-gray-500">
                {ingredient.expiryDate ? ingredient.expiryDate : 'N/A'}
              </Text>
            </TouchableOpacity>
            {index < array.length - 1 && <View className="h-[1px] bg-gray-300 mb-2" />}
          </View>
        ))}
      </View>
    );
  };

  // While loading, display a loading message
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View className="flex-1 px-10">
          <ThemedText className="text-3xl mt-6" type="bold">
            Pantry
          </ThemedText>

          {isLogged && user ? (
            <>
              <Text className="text-lg mt-6">Here are the items in your pantry:</Text>
              {renderCategorySection('produce', 'Produce')}
              {renderCategorySection('protein', 'Protein')}
              {renderCategorySection('dairy', 'Dairy')}
              {renderCategorySection('carbs', 'Carbs')}
            </>
          ) : (
            <Text className="text-xl mt-6">Please sign in to view your pantry items.</Text>
          )}
        </View>
      </ScrollView>
      <FloatingActionButton/>
    </SafeAreaView>
  );
}

