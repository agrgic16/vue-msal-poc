export interface UserInfoState {
  userInfo: {
    data: any;
    isLoading: boolean;
    error: Error | null;
  };
}
