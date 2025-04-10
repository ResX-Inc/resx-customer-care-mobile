declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: 'production' | 'preview' | 'development';
    CHATWOOT_BASE_URL_PRODUCTION: string;
    CHATWOOT_BASE_URL_STAGING: string;
    EXPO_PUBLIC_CHATWOOT_BASE_URL: string;
    EXPO_PUBLIC_APP_SLUG: string;
    PROJECT_ID: string;
    EXPO_STORYBOOK_ENABLED?: string;
    IOS_GOOGLE_SERVICES_FILE: string;
    ANDROID_GOOGLE_SERVICES_FILE: string;
    BUNDLE_IDENTIFIER: string;
  }
}
