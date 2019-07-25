import * as Msal from 'msal';

/**
 * Use this service to manage the auth flow, so that tokens can be easily provided to our Axios instance.
 */
export class AuthService {
  config: Msal.Configuration = {
    auth: {
      clientId: '39438c0e-ebd5-4d1b-80ca-c45a6d37b2f1',
      redirectUri: 'http://localhost:8080/auth',
      authority: 'https://login.microsoftonline.com/78878888-d4f9-4c6e-8891-0205364a18a4',
      // navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      // storeAuthStateInCookie: true,
    },
  };

  authParameters: Msal.AuthenticationParameters = {
    scopes: ['user.read'],
  };

  instance: Msal.UserAgentApplication;

  constructor() {
    this.instance = new Msal.UserAgentApplication(this.config);
  }

  async login() {
    const { authParameters } = this;
    try {
      await this.instance.acquireTokenSilent(authParameters);
    } catch (err) {
      await this.instance.loginPopup(authParameters);
    }
    return this.instance.getAccount();
  }

  logout() {
    this.instance.logout();
  }

  async getToken(): Promise<string> {
    const { authParameters } = this;
    try {
      const { accessToken } = await this.instance.acquireTokenSilent(authParameters);
      return accessToken;
    } catch (error) {
      const { accessToken } = await this.instance.acquireTokenPopup(authParameters);
      return accessToken;
    }
  }
}

export default new AuthService();
