// import * as Sentry from '@sentry/react-native';

import Constants from 'expo-constants';
import App from './src/app';

// TODO: It is a temporary fix to fix the reanimated logger issue
// Ref: https://github.com/gorhom/react-native-bottom-sheet/issues/1983
// https://github.com/dohooo/react-native-reanimated-carousel/issues/706
import './reanimatedConfig';
// import './wdyr';

const isStorybookEnabled = Constants.expoConfig?.extra?.eas?.storybookEnabled;

// if using dev build, set EXPO_PUBLIC_CHATWOOT_BASE_URL in your .env
process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL =
  process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL ?? Constants.expoConfig?.extra?.eas?.chatWootBaseUrl;

if (!__DEV__) {
  // TODO Sentry broken with combination of React Native < 0.77 and Sentry < 6.10
  // Sentry.init({
  //   dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  //   tracesSampleRate: 1.0,
  //   attachScreenshot: true,
  // });
}

if (__DEV__) {
  // eslint-disable-next-line
  require('./ReactotronConfig');
}
// Ref: https://dev.to/dannyhw/how-to-swap-between-react-native-storybook-and-your-app-p3o
export default (() => {
  if (isStorybookEnabled === 'true') {
    // eslint-disable-next-line
    return require('./.storybook').default;
  }

  // TODO Sentry broken with combination of React Native < 0.77 and Sentry < 6.10
  // if (!__DEV__) {
  //   return Sentry.wrap(App);
  // }

  console.log('Loading Development App');
  return App;
})();
