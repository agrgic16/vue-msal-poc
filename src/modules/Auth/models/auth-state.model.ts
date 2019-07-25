import * as Msal from 'msal';

export interface AuthState {
  userAuth: {
    data: Msal.Account | null;
    isLoading: boolean;
    error: Error | null;
  };
}
