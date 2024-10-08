import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import React from "react";
import { ThemedText } from "./ThemedText";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      // color does not work :(
      className={`bg-[#22c55e] rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
        }`}
      disabled={isLoading}
    >
      <ThemedText className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </ThemedText>

      {/* {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )} */}
    </TouchableOpacity>
  );
};

export default CustomButton;