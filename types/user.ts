// src/types/User.ts

import { Models } from 'appwrite';

/**
 * Represents a User document fetched from Appwrite.
 */
export interface User extends Models.Document {
  /**
   * The email of the user.
   */
  email: string;

  /**
   * The username of the user.
   */
  username: string;

  /**
   * The avatar URL of the user.
   */
  avatar?: string;

  // Add any other custom properties here
}
