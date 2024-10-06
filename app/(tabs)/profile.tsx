import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, StatusBar, Text, Button, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useGlobalContext } from '@/context/GlobalProvider';

const mooDengImage = require('../../assets/images/moo_deng.png');

// Saved Recipe Card Component
type RecipeCardProps = {
    title: string;
    ingredients: string;
  };
  
  function SavedRecipeCard({ title, ingredients }: RecipeCardProps) {
    const handlePress = () => {
      // Navigate to RecipeDetails page, passing title and ingredients as parameters
      router.push({
        pathname: '/recipedetails', // Path to the details page
        params: { title, ingredients },
      });
    };
  
    return (
      <Pressable onPress={handlePress}>
        <View className='flex-col'>
          {/* Use aspectRatio and width to make sure the card is always square */}
          <View
            style={{
              backgroundColor: 'gray',
              aspectRatio: 1, // Maintain square shape
              width: '100%', // Ensure it takes full width inside the parent
            }}
            className='rounded-xl'
          />
          <ThemedText className='text-xl mt-2'>{title}</ThemedText>
          <ThemedText>{ingredients}</ThemedText>
        </View>
      </Pressable>
    );
  }
  
  // Sample Data for Saved Recipes
  const savedRecipesData = [
    { id: 1, title: 'Apple Pie', ingredients: '4/4 Ingredients' },
    { id: 2, title: 'Grilled Cheese Sandwich', ingredients: '3/3 Ingredients' },
    { id: 3, title: 'Pasta Alfredo', ingredients: '5/5 Ingredients' },
    { id: 4, title: 'Chicken Soup', ingredients: '4/4 Ingredients' },
  ];

const Profile = () => {

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}> 
        <StatusBar backgroundColor="#22c55e" barStyle="light-content" />
        <View className="bg-primary w-full pt-10 pb-10 items-center">
            {/* Circular Profile Image + Name */}
            <View className="w-full items-center mt-20"> 
                <Image
                    source={mooDengImage}
                    className="w-32 h-32 rounded-full border-4 border-white"
                    resizeMode="cover"
                />
                <ThemedText type='title' className='font-bold text-white text-3xl pt-2'>Name Name</ThemedText>
            </View>
        </View>
        {/* Saved Recipes Section */}
        <View className="mt-4 pl-4">
            <ThemedText type='title' className='font-bold text-black text-2xl'>Saved Recipes</ThemedText>
        </View>
        {/* Display Saved Recipes in 2 Columns */}
      <View className="flex-1 px-10 py-5 bg-gray-100">
        {savedRecipesData.reduce((acc, recipe, index) => {
          if (index % 2 === 0) {
            acc.push(
              <View
                key={recipe.id}
                className="flex-row space-x-5"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                {/* Ensure consistent width for both columns */}
                <View style={{ width: '48%' }}>
                  <SavedRecipeCard title={recipe.title} ingredients={recipe.ingredients} />
                </View>
                {savedRecipesData[index + 1] && (
                  <View style={{ width: '48%' }}>
                    <SavedRecipeCard
                      title={savedRecipesData[index + 1].title}
                      ingredients={savedRecipesData[index + 1].ingredients}
                    />
                  </View>
                )}
              </View>
            );
          }
          return acc;
        }, [] as JSX.Element[])}
      </View>
    </ScrollView>
  )
}

export default Profile

//  {/* if not logged in, show Button */}
//             {/* <View className="flex-1 items-center justify-center">
//                 <CustomButton
//                     title="Sign in with Email"
//                     handlePress={() => router.push("/sign-in")}
//                     containerStyles="w-[70%]"
//                 />
//             </View> */}