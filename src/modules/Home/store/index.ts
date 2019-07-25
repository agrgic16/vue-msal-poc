import Vue from 'vue';
import Vuex, { StoreOptions, Store, ActionContext } from 'vuex';
import { AxiosResponse } from 'axios';
import * as Msal from 'msal';

import microsoftAPI from '@/core/api/microsoft.api';
import { UserInfoState } from '../models';

Vue.use(Vuex);

export enum Mutations {
  LoginPending = 'Auth/LOGIN_PENDING',
  LoginSuccess = 'Auth/LOGIN_SUCCESS',
  LoginError = 'Auth/LOGIN_ERROR',

  FetchUserInfoPending = 'Auth/FETCH_USER_INFO_PENDING',
  FetchUserInfoSuccess = 'Auth/FETCH_USER_INFO_SUCCESS',
  FetchUserInfoError = 'Auth/FETCH_USER_INFO_ERROR',
}

export const storeOptions: StoreOptions<UserInfoState> = {
  strict: process.env.NODE_ENV !== 'production',
  state: {
    userInfo: {
      data: null,
      isLoading: false,
      error: null,
    },
  },
  mutations: {
    [Mutations.FetchUserInfoPending](state: UserInfoState) {
      state.userInfo = {
        data: null,
        isLoading: true,
        error: null,
      };
    },
    [Mutations.FetchUserInfoSuccess](state: UserInfoState, { data }: AxiosResponse<any>) {
      state.userInfo = {
        ...state.userInfo,
        data,
        isLoading: false,
      };
    },
    [Mutations.FetchUserInfoError](state: UserInfoState, error: any) {
      state.userInfo = {
        data: null,
        isLoading: false,
        error,
      };
    },
  },
  actions: {
    async getUserInfo({ commit }: ActionContext<UserInfoState, UserInfoState>) {
      try {
        commit(Mutations.FetchUserInfoPending);
        commit(Mutations.FetchUserInfoSuccess, await microsoftAPI.get('/v1.0/me'));
      } catch (err) {
        commit(Mutations.FetchUserInfoError, err);
      }
    },
  },
  getters: {
    isLoading(state: UserInfoState): boolean {
      return state.userInfo.isLoading;
    },
    isError(state: UserInfoState): boolean {
      return !!state.userInfo.error;
    },
    userInfo(state: UserInfoState): any {
      return state.userInfo.data;
    },
  },
};

export default new Vuex.Store(storeOptions);
