// src/types/Ingredient.ts

import { Models } from 'appwrite';

/**
 * Represents an Ingredient document fetched from Appwrite.
 */
export interface Ingredient extends Models.Document {
  /**
   * A unique identifier for the ingredient.
   * This could be used internally within your application.
   */
  ingredientId: string;

  /**
   * The name of the ingredient.
   */
  name: string;

  category: string;
}
