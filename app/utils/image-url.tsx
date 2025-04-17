import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const formatImageUrl = (url?: string | undefined | null) => {
  if (!url) {
    return '';
  }

  if (url.includes('localhost')) {
    return url.replace('localhost', Platform.OS === 'ios' ? 'localhost' : Constants?.expoConfig?.hostUri?.split(':').shift() || 'localhost');
  }
  return url;
};
