import Vue from 'vue';
import Vuex, { StoreOptions, Store, ActionContext } from 'vuex';
import * as Msal from 'msal';

import microsoftAPI from '@/core/api/microsoft.api';
import authService from '@/core/services/auth.service';
import { AuthState } from '../models';

Vue.use(Vuex);

export enum Mutations {
  LoginPending = 'Auth/LOGIN_PENDING',
  LoginSuccess = 'Auth/LOGIN_SUCCESS',
  LoginError = 'Auth/LOGIN_ERROR',
}

export const storeOptions: StoreOptions<AuthState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    userAuth: {
      data: null,
      isLoading: false,
      error: null,
    },
  },
  mutations: {
    [Mutations.LoginPending](state: AuthState) {
      state.userAuth = {
        data: null,
        isLoading: true,
        error: null,
      };
    },
    [Mutations.LoginSuccess](state: AuthState, data: Msal.Account) {
      state.userAuth = {
        ...state.userAuth,
        data,
        isLoading: false,
      };
    },
    [Mutations.LoginError](state: AuthState, error: any) {
      state.userAuth = {
        ...state.userAuth,
        isLoading: false,
        error,
      };
    },
  },
  actions: {
    async login({ commit }: ActionContext<AuthState, AuthState>) {
      try {
        commit(Mutations.LoginPending);
        commit(Mutations.LoginSuccess, await authService.login());
      } catch (err) {
        commit(Mutations.LoginError, err);
      }
    },
  },
  getters: {
    isLoggedIn(state: AuthState): boolean {
      return !state.userAuth.isLoading && !!state.userAuth.data;
    },
    isLoading(state: AuthState): boolean {
      return state.userAuth.isLoading;
    },
    isError(state: AuthState): boolean {
      return !!state.userAuth.error;
    },
    authData(state: AuthState): Msal.Account | null {
      return state.userAuth.data;
    },
  },
};

export default new Vuex.Store(storeOptions);
