// appwriteTest.js

// import { Client, Account, Databases, ID } from 'react-native-appwrite';

import { ID, Account, Client, Databases } from 'react-native-appwrite';
import { Ingredient } from '@/types';
import { User } from '@/types';
// Initialize the Appwrite client

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.brh.smart-pantry',
    projectId: '67019cc8000585284e38',
    databaseId: '67019e1c0035bd7dd77d',
    userCollectionId: '6701e2a20003abbc8d17',
    ingredientsCollectionId: '6702000500172cd9a4e6',
    recripesCollectionId: '6701fe1c00325ca2f513',
    userInventoriesCollectionsId: '670206420008483fe827',
}


const client = new Client();
const databases = new Databases(client);
const account = new Account(client);

// Init your React Native SDK

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
// .setPlatform(config.platform) // Your application ID or bundle ID.

export { client, account, databases, ID };

// Register user
export async function createUser(email: string, password: string, username: string): Promise<User> {
    try {
        // Create a new account
        const newAccount = await account.create(ID.unique(), email, password, username);

        if (!newAccount) throw new Error('Account creation failed.');

        // Sign in the user
        await signIn(email, password);

        // Create a user document in the database
        const newUser = await databases.createDocument<User>(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                // Add other fields if necessary, e.g., avatar
            }
        );

        return newUser;
    } catch (error: any) {
        console.error('Error in createUser:', error);
        throw new Error(error.message || 'User creation failed.');
    }
}

export async function signIn(email: string, password: string): Promise<any> {
    try {
        // Use createEmailSession as per the official SDK
        const session = await account.createEmailPasswordSession(email, password); // Correct method
        console.log('User ID:', session.userId);  // Log the userId after successful sign-in
        return session;
    } catch (error: any) {
        console.error('Error in signIn:', error);
        throw new Error(error.message || 'Sign-in failed.');
    }
}



export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await databases.listDocuments<User>(
            config.databaseId,
            config.userCollectionId
        );

        return response.documents;
    } catch (error: any) {
        console.error('Error fetching users:', error);
        throw new Error(error.message || 'Failed to fetch users.');
    }
}


// appwrite.js (continued)

export async function getAllIngredients(): Promise<Ingredient[]> {
    try {
        const response = await databases.listDocuments<Ingredient>(
            config.databaseId,
            config.ingredientsCollectionId
        );

        return response.documents;
    } catch (error: any) {
        console.error('Error fetching ingredients:', error);
        throw new Error(error.message || 'Failed to fetch ingredients.');
    }
}
