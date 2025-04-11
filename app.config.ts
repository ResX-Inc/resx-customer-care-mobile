import { ExpoConfig, ConfigContext } from 'expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const { APP_ENV, BUNDLE_IDENTIFIER, APP_ICON } = process.env;

  if (!APP_ENV) {
    throw new Error('APP_ENV is not set');
  }

  let baseUrl: string | null = null;

  switch (APP_ENV) {
    case 'production':
      baseUrl = process.env.CHATWOOT_BASE_URL_PRODUCTION;
      break;
    case 'preview':
      baseUrl = process.env.CHATWOOT_BASE_URL_STAGING;
      break;
    default:
      baseUrl = process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL;
  }

  if (!baseUrl) {
    throw new Error('CHATWOOT_BASE_URL is not set');
  }

  const installationUrl =
    baseUrl?.replace('https://', '')?.replace('http://', '') ?? 'app.chatwoot.com';

  const appName = 'ResX CC Portal';

  return {
    name: APP_ENV === 'production' ? appName : `${appName} Test`,
    slug: process.env.EXPO_PUBLIC_APP_SLUG || 'chatwoot-mobile',
    version: '4.0.16',
    orientation: 'portrait',
    icon: `./assets/${APP_ICON ?? 'icon-test'}.png`,
    userInterfaceStyle: 'light',
    newArchEnabled: false,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      enableFullScreenImage_legacy: true,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      infoPlist: {
        NSCameraUsageDescription:
          'This app requires access to the camera to upload images and videos.',
        NSPhotoLibraryUsageDescription:
          'This app requires access to the photo library to upload images.',
        NSMicrophoneUsageDescription: 'This app requires access to the microphone to record audio.',
        NSAppleMusicUsageDescription:
          'This app does not use Apple Music, but a system API may require this permission.',
        UIBackgroundModes: ['fetch', 'remote-notification'],
        ITSAppUsesNonExemptEncryption: 'false',
      },
      // Please use the relative path to the google-services.json file
      googleServicesFile: process.env.IOS_GOOGLE_SERVICES_FILE,
      entitlements: {
        'aps-environment': 'production',
      },
      associatedDomains: [`applinks:${installationUrl}`],
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: BUNDLE_IDENTIFIER,
      permissions: [
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.RECORD_AUDIO',
        'android.permission.READ_MEDIA_IMAGES',
      ],
      // Please use the relative path to the google-services.json file
      googleServicesFile: process.env.ANDROID_GOOGLE_SERVICES_FILE,
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: installationUrl,
              pathPrefix: '/app/accounts/',
              pathPattern: '/*/conversations/*',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    extra: {
      eas: {
        projectId: process.env.PROJECT_ID,
        storybookEnabled: process.env.EXPO_STORYBOOK_ENABLED,
        chatWootBaseUrl: baseUrl,
      },
    },
    owner: 'resx-organization',
    plugins: [
      'expo-font',
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera', 'PhotoLibrary', 'MediaLibrary'],
        },
      ],
      // TODO Sentry broken with combination of React Native < 0.77 and Sentry < 6.10
      // [
      //   '@sentry/react-native/expo',
      //   {
      //     url: 'https://sentry.io/',
      //     project: process.env.EXPO_PUBLIC_SENTRY_PROJECT_NAME,
      //     organization: process.env.EXPO_PUBLIC_SENTRY_ORG_NAME,
      //   },
      // ],
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        'expo-build-properties',
        {
          // https://github.com/invertase/notifee/issues/808#issuecomment-2175934609
          android: {
            minSdkVersion: 24,
            compileSdkVersion: 35,
            targetSdkVersion: 34,
            extraMavenRepos: ['$rootDir/../../../node_modules/@notifee/react-native/android/libs'],
            enableProguardInReleaseBuilds: true,
          },
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      // TODO package no longer exists
      // [
      //   '@config-plugins/ffmpeg-kit-react-native',
      //   {
      //     package: 'min',
      //     ios: {
      //       package: 'audio',
      //     },
      //   },
      // ],
    ],
    androidNavigationBar: {
      backgroundColor: '#ffffff',
    },
  };
};
