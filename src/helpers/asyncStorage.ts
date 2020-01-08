import { AsyncStorage } from 'react-native';

const TOKEN_NAME = 'thesis-token';

export default {
  saveToken: (userToken: string) => {
    AsyncStorage.setItem(TOKEN_NAME, userToken);
  },
  getToken: () => {
    return AsyncStorage.getItem(TOKEN_NAME);
  },
  removeToken: () => {
    return AsyncStorage.removeItem(TOKEN_NAME);
  },
};
