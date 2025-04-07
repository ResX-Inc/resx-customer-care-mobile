export default () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.EXPO_PUBLIC_CHATWOOT_BASE_URL;
  }
  switch (process.env.APP_ENV) {
    case 'production':
      return process.env.CHATWOOT_BASE_URL_PRODUCTION;
    case 'preview':
      return process.env.CHATWOOT_BASE_URL_STAGING;
    default:
      return null;
  }
};
