import React from 'react';
import { View, Image, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { Redirect, router } from 'expo-router';
import { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import { FloatingActionButton } from '@/components/FloatingActionButton';
// import { createUser } from '@/lib/appwrite';
import { getAllIngredients } from '@/lib/appwrite';
import { Models } from 'appwrite';


interface Ingredient {
  $id: string;
  name: string;
  // Include any other properties your ingredient documents have
}
export default function Inventory() {
  // createUser();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);


  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsData = await getAllIngredients();
        console.log(ingredientsData)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchIngredients();
  }, []);



  // ingredients.map((ingredient) => {
  //   console.log(ingredient.$id)
  //   console.log(ingredient.name);
  // });

  return (
    <>
      <ScrollView contentContainerStyle={{ height: '100%' }} className='mt-10'>
        <View className='flex-1 px-10'>
          <ThemedText className='text-3xl mt-6' type='bold'>Pantry</ThemedText>
        </View>
        <View>

        </View>



      </ScrollView>
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
      {/* Floating Action Button */}
      <FloatingActionButton />
    </>


  );
}
