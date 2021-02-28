import axios from 'axios';
import { appInfo } from '~/appInfo';

import type { AuthRequestBodyType } from './types/AuthRequestType';
import type { AuthResponseType } from './types/AuthResponseType';

const API_STATUS_ENDPOINT = 'https://api.ibroadcast.com/s/JSON/status';

const client = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
});

export const getStatusWithAuth = async (email: string, password: string) => {
  const requestBody: AuthRequestBodyType = {
    email_address: email,
    password,
    mode: 'status',
    client: appInfo.client,
    device_name: appInfo.deviceName,
    version: '3.1',
    supported_types: false,
    url: '//api.ibroadcast.com/s/JSON/status',
  };
  const response = await client.post(API_STATUS_ENDPOINT, requestBody);
  const status: AuthResponseType = response.data;
  return status;
};

export const getStatus = async (token: string, userId: string) => {
  const requestBody: AuthRequestBodyType = {
    _token: token,
    _userid: userId,
    mode: 'status',
    client: 'website',
    device_name: 'website',
    version: '3.1',
    supported_types: false,
    url: '//api.ibroadcast.com/s/JSON/status',
  };
  const response = await client.post(API_STATUS_ENDPOINT, requestBody);
  const status: AuthResponseType = response.data;
  return status;
};
