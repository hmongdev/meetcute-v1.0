// appwrite
import { ID, Query } from "appwrite";
// config
import { appwriteConfig, account, databases, storage, avatars } from "./config";
// types
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";

// ============================================================
// AUTH 
// ============================================================

// SIGN UP
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

// SAVE USER TO DB
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
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}
// SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  // create session
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

// GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    console.log(`currentAccount`,currentAccount);
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    // if no current account
    if (!currentAccount) throw Error;
    
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      // query for the current user === 'accountId'
      [Query.equal('accountId', currentAccount.$id)]
      )
      
    // if no current user
    if (!currentUser) throw Error;
    // if current user exists
    return currentUser.documents[0];
    
  } catch (error) {
    console.log(error);
  }
}