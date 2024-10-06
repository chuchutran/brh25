import { Text, type TextProps, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'bold';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Load both Regular and Bold fonts
  const [fontsLoaded] = Font.useFonts({
    'AlbertSans-Regular': require('@/assets/fonts/AlbertSans-Regular.ttf'),
    'AlbertSans-Bold': require('@/assets/fonts/AlbertSans-Bold.ttf'), // Load the bold font
  });

  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Use the bold font family if type is bold
  const fontFamily = type === 'bold' ? 'AlbertSans-Bold' : 'AlbertSans-Regular';

  return (
    <Text
      style={[
        { color }, // Apply color if provided
        { fontFamily }, // Apply correct font family based on type
        style // Apply any inline styles
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
