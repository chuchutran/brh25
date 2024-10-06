import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, StatusBar, Text, Button, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { signOut } from '@/lib/appwrite';
import { useGlobalContext } from '@/context/GlobalProvider'; // Use the global context

const mooDengImage = require('../../assets/images/moo_deng.png');

// Saved Recipe Card Component
type RecipeCardProps = {
  title: string;
  ingredients: string;
  imageUrl: string; // Added imageUrl field
};

function SavedRecipeCard({ title, ingredients, imageUrl }: RecipeCardProps) {
  const handlePress = () => {
    // Navigate to RecipeDetails page, passing title, ingredients, and imageUrl as parameters
    router.push({
      pathname: '/recipedetails',
      params: { title, ingredients, imageUrl },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View className='flex-col'>
        {/* Recipe Image */}
        <View
          style={{
            width: '100%', // Ensure it takes full width inside the parent
          }}
          className='rounded-xl overflow-hidden'
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              aspectRatio: 1, // Maintain square shape
              width: '100%',
            }}
            className="rounded-xl"
            resizeMode="cover"
          />
        </View>
        <ThemedText className='text-xl mt-2'>{title}</ThemedText>
        <ThemedText>{ingredients}</ThemedText>
      </View>
      </View>
    </Pressable>
  );
  );
}


// Sample Data for Saved Recipes
const savedRecipesData = [
  {
    id: 3,
    title: 'Spaghetti Bolognese',
    ingredients: '5/6 Ingredients',
    imageUrl: 'https://img.freepik.com/premium-photo/pasta-spaghetti-bolognese-white-plate-white-background-bolognese-sauce-is-classic-italian_763111-5934.jpg',
  },
  {
    id: 2,
    title: 'Chicken Caesar Salad',
    ingredients: '3/3 Ingredients',
    imageUrl: 'https://img.freepik.com/free-photo/chicken-caesar-salad_1147-401.jpg?t=st=1728207121~exp=1728210721~hmac=798c547add1043cc9dac30ac3e281cdcb0643cc82d60c329dd38e459456d09db&w=1800',
  },
];

export default function Profile() {
  // Use global context to access user session state
  const { user, isLogged, loading } = useGlobalContext();

  // While loading, display a loading message
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  // If the user is logged in, show their profile information
  if (isLogged && user) {
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
            <ThemedText type='title' className='font-bold text-white text-3xl pt-2'>{user.name}</ThemedText>
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
                    <SavedRecipeCard
                      title={recipe.title}
                      ingredients={recipe.ingredients}
                      imageUrl={recipe.imageUrl}
                    />
                  </View>
                  {savedRecipesData[index + 1] && (
                    <View style={{ width: '48%' }}>
                      <SavedRecipeCard
                        title={savedRecipesData[index + 1].title}
                        ingredients={savedRecipesData[index + 1].ingredients}
                        imageUrl={savedRecipesData[index + 1].imageUrl}
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
    );
  }

  // If no user is logged in, show the sign-in button
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <ScrollView contentContainerStyle={{ height: '100%' }}>
    //     <View className="w-full justify-center items-center h-full px-4">
    //       <Image
    //         source={mooDengImage}
    //         className="w-[130px] h-[84px]"
    //         resizeMode="contain"
    //       />
    //       <ThemedText className="text-3xl font-semibold">
    //         Welcome to Moo Deng
    //       </ThemedText>

    //       {/* Continue with Email button */}
    //       <CustomButton
    //         title="Continue with Email"
    //         handlePress={() => router.push("/sign-in")}
    //         containerStyles="w-full mt-7"
    //       />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
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
          <ThemedText type='title' className='font-bold text-white text-3xl pt-2'>Please Sign-In</ThemedText>
        </View>
      </View>
      <View>
        <CustomButton
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles="mt-5 ml-5 mr-5"
        />
      </View>

    </ScrollView>
  );
}