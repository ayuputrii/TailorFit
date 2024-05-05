import axios from 'axios';

export const BASE_URL = 'https://tailorfit-be.vercel.app';
export const API_REGISTER = '/auth/register';
export const API_LOGIN = '/auth/login';
export const API_FORGOT_PASSWORD = '/auth/forgot-password';
export const API_VERIFY_OTP = '/auth/otp-verify';
export const API_RESET_PASSWORD = '/auth/reset-password';
export const API_PROFILE = '/profile';

export const postDataWithToken = async (
  url: string,
  data: any,
  token: string,
) => {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: data,
    });
    const json = await response?.json();
    return json;
  } catch (error: any) {
    console.log('eror postData', error);
    return error.response;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getData = async (url: string, token: string) => {
  try {
    let response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
