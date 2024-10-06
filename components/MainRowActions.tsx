import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SymbolView } from "expo-symbols";

interface MainRowActionsProps {
  handleTakePicture: () => void;
}

export default function MainRowActions({ handleTakePicture }: MainRowActionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name="circle"
          size={90}
          type="hierarchical"
          tintColor="white"
          fallback={
            <TouchableOpacity
              onPress={handleTakePicture}
              style={styles.fallbackButton}
            >
              <Text>📷</Text>
            </TouchableOpacity>
          }
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    position: "absolute",
    bottom: 45,
  },
  fallbackButton: {
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});
