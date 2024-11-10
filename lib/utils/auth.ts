import { account } from '@/lib/appwrite';
import { Models } from 'appwrite';

export async function getCurrentUser(): Promise<Models.User<Models.Preferences> | null> {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    return false;
  }
}

export async function signOut(): Promise<void> {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}