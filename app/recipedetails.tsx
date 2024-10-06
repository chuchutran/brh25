import { View, Image, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import ToggleButton from '@/components/ToggleButton'; // Import the updated ToggleButton

export default function RecipeDetails() {
  const { title, ingredients, imageUrl } = useLocalSearchParams(); // Retrieve imageUrl from params
  const [view, setView] = useState<'ingredients' | 'directions'>('ingredients'); // Manage state

  // Ensure imageUrl is a string (in case it's an array)
  const validImageUrl = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;
  type Ingredient = {
    quantity: string;
    ingredient: string;
  };
  // Ingredient and directions logic based on the recipe title
  let ingredientList: Ingredient[] = [];
  let directions: string[] = [];

  if (title === 'Vegetable Fried Rice With Eggs') {
    ingredientList = [
      { quantity: '2 cups', ingredient: 'rice' },
      { quantity: '1/2 pint', ingredient: 'spinach' },
      { quantity: '1/2 pint', ingredient: 'carrots' },
      { quantity: '2', ingredient: 'eggs' },
      { quantity: '1-2 tbsp', ingredient: 'soy sauce' },
    ];

    directions = [
      'Cook 1 cup of rice according to the package instructions and let it cool. It’s best to use leftover or cold rice.',
      'Heat 1 tablespoon of oil in a large skillet or wok over medium-high heat.',
      'Add diced carrots, peas, and any other vegetables of your choice to the skillet. Sauté for 3-4 minutes until the vegetables are tender.',
      'Push the vegetables to one side of the skillet and crack 2 eggs into the empty side. Scramble the eggs until fully cooked, then mix them with the vegetables.',
      'Add the cooked rice to the skillet and stir everything together.',
      'Season with 1-2 tablespoons of soy sauce, salt, and pepper to taste. Stir fry for 2-3 minutes until the rice is heated through and well combined with the vegetables and egg.',
      'Remove from heat, garnish with chopped green onions, and serve hot.'
    ];
  } else if (title === 'Chicken Caesar Salad') {
    ingredientList = [
      { quantity: '2 cups', ingredient: 'romaine lettuce' },
      { quantity: '1/2 cup', ingredient: 'Caesar dressing' },
      { quantity: '1/2 cup', ingredient: 'croutons' },
      { quantity: '1/4 cup', ingredient: 'parmesan cheese' },
      { quantity: '1', ingredient: 'grilled chicken breast' },
    ];

    directions = [
      'Grill the chicken breast until fully cooked, then slice it into thin strips.',
      'Wash and chop the romaine lettuce into bite-sized pieces.',
      'In a large bowl, toss the lettuce with Caesar dressing until evenly coated.',
      'Top with grilled chicken strips, croutons, and parmesan cheese.',
      'Serve immediately and enjoy!'
    ];
  } else if (title === 'Spaghetti Bolognese') {
    ingredientList = [
      { quantity: '1 lb', ingredient: 'ground beef' },
      { quantity: '1', ingredient: 'onion, diced' },
      { quantity: '2 cloves', ingredient: 'garlic, minced' },
      { quantity: '1 can (14 oz)', ingredient: 'crushed tomatoes' },
      { quantity: '1/4 cup', ingredient: 'tomato paste' },
      { quantity: '1/2 cup', ingredient: 'red wine (optional)' },
      { quantity: '1 tsp', ingredient: 'dried oregano' },
      { quantity: '1 tsp', ingredient: 'dried basil' },
      { quantity: '12 oz', ingredient: 'spaghetti' },
      { quantity: 'Salt and pepper', ingredient: 'to taste' },
      { quantity: 'Grated parmesan cheese', ingredient: 'for serving' },
    ];

    directions = [
      'Cook the spaghetti according to package instructions. Drain and set aside.',
      'In a large skillet, heat some olive oil over medium heat. Add diced onions and garlic, and sauté until softened.',
      'Add the ground beef to the skillet and cook until browned. Drain any excess fat.',
      'Stir in the crushed tomatoes, tomato paste, red wine (if using), oregano, and basil. Simmer for 15-20 minutes, stirring occasionally.',
      'Season the sauce with salt and pepper to taste.',
      'Serve the Bolognese sauce over the cooked spaghetti and top with grated parmesan cheese.'
    ];
  } else if (title === 'Avocado Toast') {
    ingredientList = [
      { quantity: '2 slices', ingredient: 'whole grain bread' },
      { quantity: '1', ingredient: 'ripe avocado' },
      { quantity: '1 tbsp', ingredient: 'lemon juice' },
      { quantity: 'Salt and pepper', ingredient: 'to taste' },
      { quantity: 'Optional toppings', ingredient: 'cherry tomatoes, chili flakes, olive oil' },
    ];

    directions = [
      'Toast the slices of whole grain bread to your desired crispness.',
      'While the bread is toasting, cut the avocado in half, remove the pit, and scoop out the flesh into a bowl.',
      'Mash the avocado with a fork and mix in lemon juice, salt, and pepper to taste.',
      'Spread the mashed avocado evenly over the toasted bread slices.',
      'Add optional toppings like cherry tomatoes, chili flakes, or a drizzle of olive oil if desired. Serve immediately.'
    ];
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-10">
      <View style={{ position: 'relative' }}>
        {/* Display the recipe image */}
        {validImageUrl && (
          <Image
            source={{ uri: validImageUrl }} // Use validImageUrl instead of imageUrl
            style={{
              aspectRatio: 1.5,
              width: '100%',
            }}
            resizeMode="cover"
          />
        )}
      </View>

      <View className="px-6">
        <ThemedText className="text-3xl mt-4" type="bold">
          {title}
        </ThemedText>
        <View className="flex-row items-center">
          <ThemedText className="text-xl">15 Minutes</ThemedText>
          <Entypo name="dot-single" size={24} color="black" />
          <ThemedText className="text-xl">1 Serving</ThemedText>
        </View>

        {/* Use the ToggleButton component */}
        <ToggleButton view={view} setView={setView} />

        {/* Conditional rendering based on the view state */}
        {view === 'ingredients' ? (
          <View>
            {ingredientList.map((item, index) => (
              <View key={index} className="flex-row py-2">
                <ThemedText className="text-lg">{item.quantity}</ThemedText>
                <Entypo name="dot-single" size={24} color="black" />
                <ThemedText className="text-lg">{item.ingredient}</ThemedText>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {directions.map((step, index) => (
              <View key={index} className="py-2">
                <ThemedText className="text-lg">
                  {index + 1}. {step}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
