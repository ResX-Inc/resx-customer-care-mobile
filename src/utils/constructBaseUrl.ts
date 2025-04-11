import Constants from 'expo-constants';

export default () => {
  return Constants.expoConfig?.extra?.eas?.chatWootBaseUrl as string;
};
