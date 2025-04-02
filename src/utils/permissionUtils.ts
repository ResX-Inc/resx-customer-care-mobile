// import * as Sentry from '@sentry/react-native';
import { User } from '@/types/User';
import { Account } from '@/types/Account';

export const getCurrentAccount = (
  user: User = {} as User,
  accountId: number | null = null,
): Account | undefined => {
  const accounts = user.accounts || [];
  return accounts.find(account => Number(account.id) === Number(accountId));
};

export const getUserPermissions = (user: User, accountId: number | null): string[] => {
  try {
    const currentAccount = getCurrentAccount(user, accountId) || {};
    return (currentAccount as Account).permissions || [];
  } catch (error) {
    // TODO Sentry broken with combination of React Native < 0.77 and Sentry < 6.10
    // Sentry.captureException(error, {
    //   extra: {
    //     user,
    //     accountId,
    //     functionName: 'getUserPermissions',
    //   },
    // });
    return [];
  }
};
