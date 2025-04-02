// import * as Sentry from '@sentry/react-native';
import { Alert } from 'react-native';

import i18n from '../i18n';

interface ErrorHandler {
  (e: Error, isFatal: boolean): void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorHandler = (e, isFatal) => {
  // TODO Sentry broken with combination of React Native < 0.77 and Sentry < 6.10
  // Sentry.captureException(e);
  if (isFatal) {
    Alert.alert(
      i18n.t('COMMON.ERROR_TITLE'),
      `${i18n.t('COMMON.ERROR')}: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}${i18n.t(
        'COMMON.REPORT_MESSAGE',
      )}`,
      [
        {
          text: i18n.t('COMMON.CLOSE'),
        },
      ],
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

export default {
  init(): void {
    // TODO: Enable this later
    // setNativeExceptionHandler(exceptionString => {
    //   Sentry.captureException(new Error(exceptionString), {
    //     logger: 'NativeExceptionHandler',
    //   });
    // }, false);
    // setJSExceptionHandler(errorHandler, false);
  },
};
