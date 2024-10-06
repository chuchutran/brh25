import { View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import ToggleButton from '@/components/ToggleButton'; // Import the updated ToggleButton

export default function RecipeDetails() {
  // Retrieve passed parameters
  const { title, ingredients, imageUrl } = useLocalSearchParams(); 
  const [view, setView] = useState<'ingredients' | 'directions'>('ingredients'); // Manage state

  // Sample data for ingredients and directions
  const ingredientList = [
    { quantity: '1/2 pint', ingredient: 'spinach' },
    { quantity: '1/2 pint', ingredient: 'carrots' },
  ];

  const directions = [
    'Wash and chop the spinach. Grate or finely chop the carrot.',
    'Crack 2-3 eggs into a bowl, beat lightly with a fork. Season with salt and pepper to taste.',
    'Heat a small nonstick skillet over medium heat and add a little butter or oil. Sauté the grated carrots for 1-2 minutes.',
    'In the same skillet, melt a little butter/oil over medium-low heat.',
    'Pour the beaten eggs into the pan and let them sit for a minute. Gently lift the edges of the egg with a spatula.',
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-10'>
      <View style={{ position: 'relative' }}>
        {/* Recipe Image */}
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: '100%',
              aspectRatio: 1.5,
              borderRadius: 16,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />
        ) : (
          // Fallback: Gray placeholder if imageUrl is not provided
          <View
            style={{
              backgroundColor: 'gray',
              aspectRatio: 1.5,
              width: '100%',
            }}
          />
        )}
      </View>

      <View className='px-6'>
        <ThemedText className='text-3xl mt-4' type='bold'>
          {title}
        </ThemedText>
        <View className="flex-row items-center">
          <ThemedText className='text-xl'>
            15 Minutes
          </ThemedText>
          <Entypo name="dot-single" size={24} color="black" />
          <ThemedText className='text-xl'>
            1 Serving
          </ThemedText>
        </View>

        {/* Use the ToggleButton component */}
        <ToggleButton view={view} setView={setView} />

        {/* Conditional rendering based on the view state */}
        {view === 'ingredients' ? (
          <View>
            {ingredientList.map((item, index) => (
              <View key={index} className="flex-row py-2">
                <ThemedText className='text-lg'>{item.quantity}</ThemedText>
                <Entypo name="dot-single" size={24} color="black" />
                <ThemedText className='text-lg'>{item.ingredient}</ThemedText>
              </View>
            ))}
          </View>
        ) : (
          <View>
            {directions.map((step, index) => (
              <View key={index} className="py-2">
                <ThemedText className='text-lg'>{index + 1}. {step}</ThemedText>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
