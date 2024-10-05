import { Client, Account, ID, Models } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.brh.smart-pantry',
    projectID: '67019cc8000585284e38', 
    databaseID: '67019e1c0035bd7dd77d',
    userCollectionID: '67019e40002f81cd983c',
    photoCollectionID: '67019e7600008e82bcf7'
    // storageId: 
}

client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectID)  
  .setPlatform(config.platform);   

  const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'kelly.tran3252@gmail.com', 'password', 'John Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
} 
