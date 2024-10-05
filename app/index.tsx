import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl"> BRH25 !</Text>
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: 'blue'}}>Go to Profile</Link>
    </View>
  )
}

export default Home
