// appwrite
import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
// types => interfaces
import { INewUser } from "@/types";

// create Auth user
export async function createUserAccount(user: INewUser) {
  try {
    // create a new Auth User
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    
    // if no new Account
    if (!newAccount) throw Error;
    
    const avatarUrl = avatars.getInitials(user.name);
    
    // create new user in DB
    const newUser = await saveUserToDB({ 
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });
    
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// save user to DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user,
    )
    
    return newUser;
  } catch (error) {
    console.log(error);
  }
}