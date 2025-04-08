import Constants from 'expo-constants';

export default () => {
  // if you're doing local development, set EXPO_PUBLIC_CHATWOOT_BASE_URL in your .env, otherwise we're using the value set in app.config
  return (process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL ??
    Constants.expoConfig?.extra?.eas?.chatWootBaseUrl) as string;
};
