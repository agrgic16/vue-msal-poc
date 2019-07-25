import axios, {
  AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError,
} from 'axios';
import authService from '../services/auth.service';

const requestHandler = async (request: AxiosRequestConfig) => {
  const accessToken = await authService.getToken();
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
};

const successHandler = (response: AxiosResponse) => response;

const errorHandler = (error: AxiosError) => {
  console.error('Graph API HTTP Error', { ...error });
  return Promise.reject({ ...error });
};

const microsoftAPI: AxiosInstance = axios.create({
  baseURL: 'https://graph.microsoft.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

microsoftAPI.interceptors.request.use(requestHandler);
microsoftAPI.interceptors.response.use(successHandler, errorHandler);

export default microsoftAPI;
