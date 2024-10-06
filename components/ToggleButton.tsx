import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

type ToggleButtonProps = {
  view: 'ingredients' | 'directions';
  setView: React.Dispatch<React.SetStateAction<'ingredients' | 'directions'>>;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ view, setView }) => {
  return (
    <View className='flex-row justify-around my-4 bg-[#D2D5DA] rounded-full p-1'>
      <TouchableOpacity
        onPress={() => setView('ingredients')}
        className={`px-10 py-2 ${view === 'ingredients' ? 'bg-[#1F2937]' : ''} rounded-full`}
      >
        <ThemedText className={`text-xl ${view === 'ingredients' ? 'text-white' : 'text-[#6D7280]'}`}>Ingredients</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setView('directions')}
        className={`px-10 py-2 ${view === 'directions' ? 'bg-[#1F2937]' : ''} rounded-full`}
      >
        <ThemedText className={` text-xl ${view === 'directions' ? 'text-white' : 'text-[#6D7280]'}`}>Directions</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;
