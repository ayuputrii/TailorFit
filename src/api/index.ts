import axios from 'axios';

export const BASE_URL = 'https://tailorfit-be.vercel.app';
// export const BASE_URL =
//   'https://5814-2001-448a-2092-2ac8-4483-f10e-3e7-cb8c.ngrok-free.app';
export const API_REGISTER = '/auth/register';
export const API_LOGIN = '/auth/login';
export const API_FORGOT_PASSWORD = '/auth/forgot-password';
export const API_UPDATE_EMAIL = '/auth/update-email';
export const API_CHANGE_EMAIL = '/auth/change-email';
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
export const API_GOOGLE_REGISTER_LOGIN = '/auth/google-login';
export const API_CART = '/cart';
export const API_SIZE = '/size';
export const API_ORDER = '/order';
export const API_RETURN = '/return-order';

export const postDataWithToken = async (
  url: string,
  data: any,
  token: string,
  contentType?: string,
) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        Authorization: token,
        'Content-Type': contentType || 'application/json',
      },
    });
    return response;
  } catch (error: any) {
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
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const postFormData = async (url: string, data: any, token: string) => {
  try {
    let response = await axios.post(url, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const putFormData = async (url: string, data: any, token: string) => {
  try {
    let response = await axios.put(url, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const putDataWithToken = async (
  url: string,
  data: any,
  token: string,
) => {
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

export const patchDataWithToken = async (url: string, token: string) => {
  try {
    let response = await axios.patch(url, undefined, {
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
