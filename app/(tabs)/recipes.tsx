import Ionicons from '@expo/vector-icons/Ionicons';
import { View, ScrollView, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import React from 'react';

type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  imageUrl: string; // Added imageUrl field
};

type RecipeCardProps = {
  title: string;
  ingredients: string;
  imageUrl: string;
};

function RecipeCard({ title, ingredients, imageUrl }: RecipeCardProps) {
  const handlePress = () => {
    // Navigate to RecipeDetails page, passing title, ingredients, and imageUrl as parameters
    router.push({
      pathname: '/recipedetails', // Path to the details page
      params: { title, ingredients, imageUrl },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex-col">
        <View style={{ width: '100%' }} className="rounded-xl overflow-hidden">
          <Image
            source={{ uri: imageUrl }}
            style={{
              aspectRatio: 1,
              width: '100%',
            }}
            className="rounded-xl"
            resizeMode="cover"
          />
        </View>
        <ThemedText className="text-xl mt-2">{title}</ThemedText>
        <ThemedText>{ingredients}</ThemedText>
      </View>
    </Pressable>
  );
}

const recipesData: Recipe[] = [
  { id: 1, title: 'Vegetable Fried Rice With Eggs', ingredients: '4/5 Ingredients', imageUrl: 'https://chefsavvy.com/wp-content/uploads/vegetable-fried-rice-with-runny-fried-egg.jpg' },
  { id: 2, title: 'Chicken Caesar Salad', ingredients: '3/5 Ingredients', imageUrl: 'https://img.freepik.com/free-photo/chicken-caesar-salad_1147-401.jpg?t=st=1728207121~exp=1728210721~hmac=798c547add1043cc9dac30ac3e281cdcb0643cc82d60c329dd38e459456d09db&w=1800' },
  { id: 3, title: 'Spaghetti Bolognese', ingredients: '5/11 Ingredients', imageUrl: 'https://img.freepik.com/premium-photo/pasta-spaghetti-bolognese-white-plate-white-background-bolognese-sauce-is-classic-italian_763111-5934.jpg' },
  { id: 4, title: 'Avocado Toast', ingredients: '2/5 Ingredients', imageUrl: 'https://img.freepik.com/premium-photo/avocado-toast-white-plate-white-background_864588-11016.jpg' },
];

const exploreData: Recipe[] = [
  { id: 1, title: 'Breakfast Burrito', ingredients: '2/3 Ingredients', imageUrl: 'https://t3.ftcdn.net/jpg/06/07/17/60/360_F_607176003_m69P50rVqWlYMIfDK72oo11eLgW5uio2.jpg' },
  { id: 2, title: 'Cheesy Stuffed Peppers', ingredients: '5/6 Ingredients', imageUrl: 'https://img.freepik.com/premium-photo/stuffed-peppers-halves-peppers-stuffed-with-rice-dried-tomatoes-herbs-cheese-baking-dish-blue-wooden-table-top-view-turkish-name-biber-dolmasi_693630-24263.jpg' },
];

export default function Recipes() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-10">
      <View className="flex-1 px-10">
        <ThemedText className="text-3xl mt-6" type="bold">
          Recipes
        </ThemedText>
        <ThemedText className="text-xl py-2" type="bold">
          Cook Now
        </ThemedText>

        {/* Recipe cards mapped from JSON data */}
        <View>
          {recipesData.reduce((acc, recipe, index) => {
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
                  <View style={{ width: '48%' }}>
                    <RecipeCard
                      title={recipe.title}
                      ingredients={recipe.ingredients}
                      imageUrl={recipe.imageUrl} // Pass imageUrl here
                    />
                  </View>
                  {recipesData[index + 1] && (
                    <View style={{ width: '48%' }}>
                      <RecipeCard
                        title={recipesData[index + 1].title}
                        ingredients={recipesData[index + 1].ingredients}
                        imageUrl={recipesData[index + 1].imageUrl} // Pass imageUrl here
                      />
                    </View>
                  )}
                </View>
              );
            }
            return acc;
          }, [] as JSX.Element[])}
        </View>

        <ThemedText className="text-xl py-2" type="bold">
          Explore
        </ThemedText>
        <View>
          {exploreData.reduce((acc, recipe, index) => {
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
                  <View style={{ width: '48%' }}>
                    <RecipeCard
                      title={recipe.title}
                      ingredients={recipe.ingredients}
                      imageUrl={recipe.imageUrl} // Pass imageUrl here
                    />
                  </View>
                  {exploreData[index + 1] && (
                    <View style={{ width: '48%' }}>
                      <RecipeCard
                        title={exploreData[index + 1].title}
                        ingredients={exploreData[index + 1].ingredients}
                        imageUrl={exploreData[index + 1].imageUrl} // Pass imageUrl here
                      />
                    </View>
                  )}
                </View>
              );
            }
            return acc;
          }, [] as JSX.Element[])}
        </View>
      </View>
    </ScrollView>
  );
}