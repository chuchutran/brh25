import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { getAllIngredients } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider'; // Use the global context

interface Ingredient {
  $id: string;
  name: string;
  // Include any other properties your ingredient documents have
}

export default function Inventory() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Access user session and state from global context
  const { user, isLogged, loading } = useGlobalContext();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        if (isLogged) {  // Fetch ingredients only if the user is logged in
          const ingredientsData = await getAllIngredients();
          setIngredients(ingredientsData);
          // console.log('Ingredients:', ingredientsData);
        }
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [isLogged]); // Fetch ingredients when the user is logged in
  console.log("profile fetch ingredients: " + isLogged)
  // While loading, display a loading message
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={{ height: '100%' }} className="mt-10">
        <View className="flex-1 px-10">
          <ThemedText className="text-3xl mt-6" type="bold">
            Pantry
          </ThemedText>

          {/* If the user is logged in, display the welcome message and pantry items */}
          {isLogged && user ? (
            <>
              <Text className="text-xl mt-6">Welcome, {user.name}!</Text>
              <Text className="text-lg">Here are the items in your pantry:</Text>

              {/* Display the list of ingredients */}
              {ingredients.length > 0 ? (
                ingredients.map((ingredient) => (
                  <View key={ingredient.$id} className="mt-4">
                    <Text className="text-lg">• {ingredient.name}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-lg mt-4">Your pantry is empty.</Text>
              )}
            </>
          ) : (
            <Text className="text-xl mt-6">
              Please sign in to view your pantry items.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </>
  );
}
