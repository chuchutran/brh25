import { Client, Account, ID, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.brh.smart-pantry',
    projectID: '67019cc8000585284e38', 
    databaseID: '67019e1c0035bd7dd77d',
    userCollectionID: '6701e2a20003abbc8d17',
    // storageId: 
}

client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)  
  .setPlatform(config.platform);   

  const account = new Account(client);
  //const avatar = new Avatars(client);
  const databases = new Databases(client);


export const createUser = async (email, password, name) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name    
        );

        if (!newAccount) throw Error;

        // const avatarUrl = Avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseID,
            config.userCollectionID,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                name: name,
                // avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
} 

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {

    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseID,
            config.userCollectionID,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

