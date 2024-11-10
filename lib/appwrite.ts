import { Client, Account, Databases } from 'appwrite';

// Initialize the client without throwing errors for missing env vars
const client = new Client();

// Only set up Appwrite if environment variables are available
if (typeof window !== 'undefined') {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (projectId) {
    client
      .setEndpoint(endpoint)
      .setProject(projectId);
  }
}

export const account = new Account(client);
export const databases = new Databases(client);

export { client };