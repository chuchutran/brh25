import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function RecipeDetails() {
  const { title, ingredients } = useLocalSearchParams(); // Retrieve passed parameters

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-10'>
      {/* Wrapper to allow back button to be positioned absolutely */}
      <View style={{ position: 'relative' }}>


        {/* Gray square view */}
        <View
          style={{
            backgroundColor: 'gray',
            aspectRatio: 1.5, // Maintain square shape
            width: '100%', // Ensure it takes full width inside the parent
          }}
        />
      </View>

      <View className='px-6'>
        <ThemedText className='text-3xl mt-6' type='bold'>
          {title}
        </ThemedText>
        <ThemedText className='text-xl py-4'>
          Ingredients: {ingredients}
        </ThemedText>
        {/* You can add more details here */}
      </View>
    </ScrollView>
  );
}
