// database setup for appwrite
import { Client, Account, Databases, Storage, Avatars } from 'appwrite';

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
}

// create instance of client
export const client = new Client();
// configure client
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

// pass client into account, db, storage, and avatars
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);