import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Keyboard } from 'react-native';

// Define the type for the sample data items
type Item = {
  id: string;
  title: string;
  description: string;
};

interface SearchBarProps {
  onSearch: (query: string) => void; // Define the prop type for onSearch
}

export default function SearchBar() {
  const [query, setQuery] = useState<string>(''); // Define state types
  const [results, setResults] = useState<Item[]>([]); // Define state type for results
  const [loading, setLoading] = useState<boolean>(false); // State for loading indication
  const [error, setError] = useState<string | null>(null); // State for handling errors

  // Sample data to simulate search results
  const sampleData: Item[] = [
    { id: '1', title: 'Apple', description: 'A red fruit' },
    { id: '2', title: 'Banana', description: 'A yellow fruit' },
    { id: '3', title: 'Carrot', description: 'An orange vegetable' },
    { id: '4', title: 'Date', description: 'A brown fruit' },
    { id: '5', title: 'Eggplant', description: 'A purple vegetable' },
  ];

  // Simulate the search functionality
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    // Dismiss the keyboard if open
    Keyboard.dismiss();

    // Simulate network delay
    setTimeout(() => {
      // Filter the sample data based on the query
      const filteredResults = sampleData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      // Set the fetched documents to the results
      setResults(filteredResults);
      setLoading(false);

      // If no results found, set an error message
      if (filteredResults.length === 0) {
        setError('No results found');
      }
    }, 500); // Simulating a delay
  };

  return (
    <View>
      {/* Input field for the search query */}
      <TextInput className='border-1 px-2 py-4 rounded-full bg-[#D9D9D9]'
        placeholder="Search an ingredient..."
        value={query}
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={handleSearch} // Trigger search when Return is pressed
        returnKeyType="search" // Display a "Search" button on the keyboard

      />

      {/* Search Button */}
      {/* <Button title="Search" onPress={handleSearch} disabled={loading} /> */}

      {/* Loading Indicator */}
      {loading && <Text>Loading...</Text>}

      {/* Error Message */}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}

      {/* Search Results */}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id} // Unique key for each item
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: 'lightgray' }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}
