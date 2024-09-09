import {useEffect, useState} from 'react';
import {getData} from '../utils/async-storage';

export default function useIsLogin() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await getData('ACCESS_TOKEN');
      if (token) {
        setIsLogin(true);
        return;
      }
      setIsLogin(false);
    };
    getToken();
  }, []);

  return {
    isLogin,
  };
}
