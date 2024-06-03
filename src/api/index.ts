import axios from 'axios';

export const BASE_URL = 'https://tailorfit-be.vercel.app';
//export const BASE_URL = 'http://110.137.195.44:3001';
// export const BASE_URL = 'http://192.168.234.219:3000';
// export const BASE_URL = 'http://192.168.82.219:3000';
export const API_REGISTER = '/auth/register';
export const API_LOGIN = '/auth/login';
export const API_FORGOT_PASSWORD = '/auth/forgot-password';
export const API_VERIFY_OTP = '/auth/otp-verify';
export const API_RESET_PASSWORD = '/auth/reset-password';
export const API_PROFILE = '/auth/profile';
export const API_CATEGORY = '/category';
export const API_PROMOTION = '/promotion';
export const API_PRODUCT = '/product';
export const API_FAVORITE = '/favorite';
export const API_REVIEW = '/review';
export const API_ADDRESS = '/address';
export const API_GET_DEFAULT_ADDRESS = '/set-default';

export const postDataWithToken = async (
  url: string,
  data: any,
  token: string,
) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error: any) {
    console.log('rrrrr', error?.response);
    return error.response;
  }
};

export const postData = async (url: string, data: any) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        Accept: 'application/json',
      },
    });
    console.log('LOGIN___', JSON.stringify(response.data, null, 3));
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getDataResponse = async (url: string) => {
  try {
    let response = await axios.get(url);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getDataWithToken = async (url: string, token: string) => {
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

export const putData = async (url: string, data: any, token: string) => {
  try {
    let response = await axios.put(url, data, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const deleteWithToken = async (url: string, token: string) => {
  try {
    let response = await axios.delete(url, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};
