import Medusa from '@medusajs/js-sdk';
import {PUBLISHABLE_API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const publishableKey = PUBLISHABLE_API_KEY || '';
export const AUTH_TOKEN_KEY = 'auth-token';

const apiClient = new Medusa({
  baseUrl: 'http://localhost:9000',
  publishableKey: publishableKey,
  auth: {
    type: 'jwt',
    jwtTokenStorageMethod: 'custom',
    jwtTokenStorageKey: AUTH_TOKEN_KEY,
    storage: AsyncStorage,
  },
});

export default apiClient;
