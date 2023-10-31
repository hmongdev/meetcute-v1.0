// appwrite
import { ID } from "appwrite";
import { account } from "./config";
// types => interfaces
import { INewUser } from "@/types";

// fx in signup form that will connect to appwrite => create a user!
export async function createUserAccount(user: INewUser) {
  try {
    // create a new account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}