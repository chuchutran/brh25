import Ionicons from '@expo/vector-icons/Ionicons';
import { View, ScrollView, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';

type Recipe = {
  id: number;
  title: string;
  ingredients: string;
};

type RecipeCardProps = {
  title: string;
  ingredients: string;
};

function RecipeCard({ title, ingredients }: RecipeCardProps) {
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

const recipesData: Recipe[] = [
  { id: 1, title: 'Vegetable Fried Rice With Eggs', ingredients: '4/4 Ingredients' },
  { id: 2, title: 'Chicken Caesar Salad', ingredients: '3/3 Ingredients' },
  { id: 3, title: 'Spaghetti Bolognese', ingredients: '5/6 Ingredients' },
  { id: 4, title: 'Avocado Toast', ingredients: '2/2 Ingredients' },
];

const exploreData: Recipe[] = [
  { id: 1, title: 'Breakfast Burrito', ingredients: '2/3 Ingredients' },
  { id: 2, title: 'Cheesy Stuffed Peppers', ingredients: '5/6 Ingredients' },
];

export default function Recipes() {
  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-10'>
        <View className='flex-1 px-10'>
          <ThemedText className='text-3xl mt-6' type='bold'>Recipes</ThemedText>
          <ThemedText className='text-xl py-2' type='bold'>Cook Now</ThemedText>

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
                    {/* Ensure consistent width for both columns */}
                    <View style={{ width: '48%' }}>
                      <RecipeCard title={recipe.title} ingredients={recipe.ingredients} />
                    </View>
                    {recipesData[index + 1] && (
                      <View style={{ width: '48%' }}>
                        <RecipeCard
                          title={recipesData[index + 1].title}
                          ingredients={recipesData[index + 1].ingredients}
                        />
                      </View>
                    )}
                  </View>
                );
              }
              return acc;
            }, [] as JSX.Element[])}
          </View>

          <ThemedText className='text-xl py-2' type='bold'>Explore</ThemedText>
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
                    {/* Ensure consistent width for both columns */}
                    <View style={{ width: '48%' }}>
                      <RecipeCard title={recipe.title} ingredients={recipe.ingredients} />
                    </View>
                    {exploreData[index + 1] && (
                      <View style={{ width: '48%' }}>
                        <RecipeCard
                          title={exploreData[index + 1].title}
                          ingredients={exploreData[index + 1].ingredients}
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
    </>
  );
}
